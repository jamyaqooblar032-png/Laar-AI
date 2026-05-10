const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_BASE = "https://api-inference.huggingface.co/models";

export class HFError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

function ensureKey() {
  if (!HF_API_KEY) {
    throw new HFError("HuggingFace API not configured", 503);
  }
  return HF_API_KEY;
}

export type WhisperChunk = {
  text: string;
  timestamp: [number, number | null];
};

export async function hfTranscribe(
  audio: ArrayBuffer,
  contentType: string = "audio/wav",
  options: { returnTimestamps?: boolean } = {}
): Promise<{ text: string; chunks?: WhisperChunk[]; language?: string }> {
  const key = ensureKey();
  const url = options.returnTimestamps
    ? `${HF_BASE}/openai/whisper-large-v3?return_timestamps=true`
    : `${HF_BASE}/openai/whisper-large-v3`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": contentType,
      "x-use-cache": "false",
    },
    body: audio,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new HFError(`Whisper failed: ${err.slice(0, 200)}`, res.status);
  }

  const data = (await res.json()) as {
    text?: string;
    chunks?: WhisperChunk[];
  };
  return { text: data.text ?? "", chunks: data.chunks };
}

export async function hfImageGenerate(
  prompt: string,
  options: { model?: string; negativePrompt?: string } = {}
): Promise<{ blob: Blob; contentType: string }> {
  const key = ensureKey();
  const model = options.model ?? "black-forest-labs/FLUX.1-schnell";

  const res = await fetch(`${HF_BASE}/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: options.negativePrompt
        ? { negative_prompt: options.negativePrompt }
        : undefined,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new HFError(`Image gen failed: ${err.slice(0, 200)}`, res.status);
  }

  const blob = await res.blob();
  return { blob, contentType: blob.type || "image/png" };
}

export async function hfBackgroundRemove(
  image: ArrayBuffer,
  contentType: string = "image/png"
): Promise<{ blob: Blob; contentType: string }> {
  const key = ensureKey();
  const res = await fetch(`${HF_BASE}/briaai/RMBG-1.4`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": contentType,
    },
    body: image,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new HFError(
      `Background removal failed: ${err.slice(0, 200)}`,
      res.status
    );
  }

  const blob = await res.blob();
  return { blob, contentType: blob.type || "image/png" };
}

export function isHFConfigured(): boolean {
  return Boolean(HF_API_KEY);
}
