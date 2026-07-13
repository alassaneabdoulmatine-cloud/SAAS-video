from faster_whisper import WhisperModel

model = WhisperModel(
    "tiny",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(
    "audio.mp3",
    word_timestamps=True
)

print("Langue :", info.language)

for segment in segments:
    print("\nPhrase :", segment.text)

    for word in segment.words:
        print(
            word.word,
            "->",
            word.start,
            word.end
        )