export type UploaderOptions = {
    chunkSize?: number;
    maxConcurrent?: number;
    onProgress?: (percentage: number) => void;
}

export type CompletedPart = {
    PartNumber: number;
    ETag: string;
}