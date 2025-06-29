# Etymology App for CS601
# Omar Elghoul

from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/")
@app.get("/health")
async def health():
    return {
        "ok": True,
        "time": int(time.time() * 1000)
    }
