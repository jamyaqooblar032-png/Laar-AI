const EL_API_KEY = process.env.ELEVENLABS_API_KEY;
const EL_BASE = "https://api.elevenlabs.io/v1";

export class ElevenLabsError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export type Voice = {
  id: string;
  name: string;
  description: string;
  language: "en" | "ur" | "multilingual";
  preview?: string;
};

export const VOICES: Voice[] = [
  {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    description: "Calm, professional female · English",
    language: "en",
  },
  {
    id: "ErXwobaYiN019PkySvjV",
    name: "Antoni",
    description: "Warm, conversational male · English",
    language: "en",
  },
  {
    id: "MF3mGyEYCl7XYWbV9V6O",
    name: "Elli",
    description: "Young, expressive female · English",
    language: "en",
  },
  {
    id: "TxGEqnHWrfWFTfGW9XjX",
    name: "Josh",
    description: "Deep, authoritative male · English",
    language: "en",
  },
  {
    id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    description: "Narrative, podcaster · English",
    language: "en",
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella",
    description: "Soft, pleasant female · English/Multilingual",
    language: "multilingual",
  },
];

function ensureKey() {
  if (!EL_API_KEY) {
    throw new ElevenLabsError("ElevenLabs API not configured", 503);
  }
  return EL_API_KEY;
}

export async function elTextToSpeech(
  text: string,
  voiceId: string,
  options: { modelId?: string; stability?: number; similarity?: number } = {}
): Promise<Blob> {
  const key = ensureKey();
  const modelId = options.modelId ?? "eleven_multilingual_v2";

  const res = await fetch(`${EL_BASE}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": key,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: options.stability ?? 0.5,
        similarity_boost: options.similarity ?? 0.75,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new ElevenLabsError(
      `TTS failed: ${err.slice(0, 200)}`,
      res.status
    );
  }

  return await res.blob();
}

export function isElevenLabsConfigured(): boolean {
  return Boolean(EL_API_KEY);
}
