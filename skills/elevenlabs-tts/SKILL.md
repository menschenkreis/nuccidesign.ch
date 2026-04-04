---
name: elevenlabs-tts
description: Generate speech from text using ElevenLabs API. Use when asked to convert text to speech, make voice messages, tell stories with voice, or generate audio. Requires ELEVENLABS_API_KEY env var.
---

# ElevenLabs TTS

Generate speech via ElevenLabs and send as voice messages or save to file.

## Setup

Ensure `ELEVENLABS_API_KEY` is set in the environment (configured in OpenClaw env).

## Usage

### List available voices
```bash
python3 skills/elevenlabs-tts/scripts/tts.py voices
```

### Generate speech
```bash
python3 skills/elevenlabs-tts/scripts/tts.py speak "Hello world" --output /tmp/speech.mp3
```

### Custom voice
```bash
python3 skills/elevenlabs-tts/scripts/tts.py speak "Text here" --voice VOICE_ID --output /tmp/speech.mp3
```

### Send as voice message (Telegram)
```bash
python3 skills/elevenlabs-tts/scripts/tts.py speak "Your text" --output /tmp/speech.mp3
# Then send via message tool with asVoice=true, filePath=/tmp/speech.mp3
```

## Parameters

- `--voice`: Voice ID (default: `21m00Tcm4TlvDq8ikWAM` = Rachel)
- `--model`: Model ID (default: `eleven_multilingual_v2`)
- `--stability`: 0-1, lower = more expressive (default: 0.5)
- `--similarity`: 0-1, higher = closer to original voice (default: 0.75)
- `--output`: Output file path (default: `/tmp/tts_output.mp3`)

## Popular Voices

| Name | ID |
|------|----|
| Rachel | 21m00Tcm4TlvDq8ikWAM |
| Drew | 29vD33N1CtxCmqQRPOHJ |
| Clyde | 2EiwWnXFnvU5JabPnv8n |
| Paul | 5Q0t7uMcjvnagumLfvZi |
| Charlie | IKne3meq5aSn9XLyUdCD |

## Tips

- Use `stability=0.3-0.4` for storytelling (more expressive)
- Use `stability=0.7-0.8` for narration (more consistent)
- `eleven_multilingual_v2` supports many languages including German, Italian, English
