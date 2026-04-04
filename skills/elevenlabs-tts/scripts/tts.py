#!/usr/bin/env python3
"""ElevenLabs TTS — generate speech from text."""
import argparse, json, os, sys, urllib.request, urllib.error

API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
API_BASE = "https://api.elevenlabs.io/v1"

def voices():
    req = urllib.request.Request(f"{API_BASE}/voices", headers={"xi-api-key": API_KEY})
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read())
    return [{"id": v["voice_id"], "name": v["name"], "labels": v.get("labels", {})} for v in data.get("voices", [])]

def tts(text, voice_id="21m00Tcm4TlvDq8ikWAM", model_id="eleven_multilingual_v2", output=None, stability=0.5, similarity=0.75):
    payload = json.dumps({
        "text": text,
        "model_id": model_id,
        "voice_settings": {"stability": stability, "similarity_boost": similarity}
    }).encode()
    req = urllib.request.Request(
        f"{API_BASE}/text-to-speech/{voice_id}",
        data=payload,
        headers={"xi-api-key": API_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as r:
            audio = r.read()
    except urllib.error.HTTPError as e:
        print(f"Error {e.code}: {e.read().decode()}", file=sys.stderr)
        sys.exit(1)
    out = output or "/tmp/tts_output.mp3"
    with open(out, "wb") as f:
        f.write(audio)
    print(out)

def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd")
    v = sub.add_parser("voices")
    t = sub.add_parser("speak")
    t.add_argument("text")
    t.add_argument("--voice", default="21m00Tcm4TlvDq8ikWAM", help="Voice ID (default: Rachel)")
    t.add_argument("--model", default="eleven_multilingual_v2")
    t.add_argument("--output", "-o", default="/tmp/tts_output.mp3")
    t.add_argument("--stability", type=float, default=0.5)
    t.add_argument("--similarity", type=float, default=0.75)
    args = p.parse_args()
    if args.cmd == "voices":
        for v in voices():
            print(f"{v['id']}  {v['name']}  {v.get('labels', {})}")
    elif args.cmd == "speak":
        tts(args.text, args.voice, args.model, args.output, args.stability, args.similarity)
    else:
        p.print_help()

if __name__ == "__main__":
    main()
