import { Injectable } from '@nestjs/common';
import { AbortMultipartUploadCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid'
import { getSignedUrl as getS3SignedUrl } from '@aws-sdk/s3-request-presigner'
import { getSignedUrl as getCfSignedUrl } from "@aws-sdk/cloudfront-signer";

@Injectable()
export class UploadService {
    private readonly s3client: S3Client;
    private readonly BUCKET_NAME: string;
    // Optimal chunk size for network efficiency
    private readonly CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

    constructor(private readonly configService: ConfigService) {

        this.BUCKET_NAME = this.configService.getOrThrow('AWS_BUCKET_NAME');

        this.s3client = new S3Client({
            region: this.configService.getOrThrow('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });

    }

    async initiateMultipartUpload(
        filename: string,
        contentType: string,
    ) {
        const key = `uploads/${uuidv4()}/${filename}`;

        const command = new CreateMultipartUploadCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });

        const response = await this.s3client.send(command);

        return {
            uploadId: response.UploadId,
            key: key,
            chunkSize: this.CHUNK_SIZE,
        };
    }

    async getPresignedPartUrl(
        key: string,
        uploadId: string,
        partNumber: number,
    ): Promise<string> {
        const command = new UploadPartCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
        });

        // Longer expiration for large file parts
        return await getS3SignedUrl(this.s3client, command, {
            expiresIn: 3600 // 1 hour
        });
    }

    async completeMultipartUpload(
        key: string,
        uploadId: string,
        parts: Array<{ PartNumber: number; ETag: string }>,
    ) {
        const command = new CompleteMultipartUploadCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts.sort((a, b) => a.PartNumber - b.PartNumber)
            },
        });

        return await this.s3client.send(command);
    }

    async abortMultipartUpload(key: string, uploadId: string) {
        const command = new AbortMultipartUploadCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            UploadId: uploadId,
        });

        await this.s3client.send(command);
    }

    async getPrivateVideoUrl(videoKey: string) {
        const cloudfrontDistributionUrl = this.configService.getOrThrow('CLOUDFRONT_DISTRIBUTION_URL');
        const url = `${cloudfrontDistributionUrl}/${videoKey}`;

        const privateKey = this.configService.getOrThrow('CLOUDFRONT_PRIVATE_KEY').replace(/\\n/g, "\n");
        const keyPairId = this.configService.getOrThrow('CLOUDFRONT_KEY_PAIR_ID');

        console.log("privateKey : ", privateKey);
        console.log("keyPairId : ", keyPairId);

        const signedUrl = getCfSignedUrl({
            url: url,
            keyPairId: keyPairId,
            privateKey: privateKey,
            dateLessThan: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // Expire dans 1 heure
        });

        return signedUrl;
    }

}
