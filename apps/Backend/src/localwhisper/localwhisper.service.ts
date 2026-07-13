import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Injectable()
export class LocalwhisperService {

    async transcribeLocalWhisper(path: string) {

        const buffer = await readFile(path);

        const formData = new FormData();

        formData.append(
            "file",
            new Blob([buffer]),
            "audio.mp3"
        );

        const response = await fetch(
            "http://localhost:8001/transcribe",
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Whisper Error");
        }

        return await response.json();
    }
}
