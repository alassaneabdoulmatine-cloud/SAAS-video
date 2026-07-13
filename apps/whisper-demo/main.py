from fastapi import FastAPI, UploadFile, File
from faster_whisper import WhisperModel
import shutil


app = FastAPI()


model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):

    path = "temp_audio.mp3"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    segments, info = model.transcribe(
        path,
        word_timestamps=True
    )


    words = []

    for segment in segments:
        for word in segment.words:
            words.append({
                "endMs": word.end*1000,
                "startMs": word.start*1000,
                "text": word.word,
            })

    return {
         words
    }