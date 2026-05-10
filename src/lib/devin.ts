/**
 * Devin API client.
 *
 * Spawns Devin coding sessions programmatically using the user's Pro account.
 * https://docs.devin.ai/api-reference
 *
 * Cost: each session consumes ACUs from the configured account.
 */

const DEVIN_BASE = "https://api.devin.ai/v1";

export type DevinSessionRequest = {
  prompt: string;
  title?: string;
  idempotent?: boolean;
  tags?: string[];
};

export type DevinSession = {
  session_id: string;
  url: string;
  is_new_session?: boolean;
  status?: string;
};

export async function createDevinSession(
  req: DevinSessionRequest
): Promise<DevinSession> {
  const apiKey = process.env.DEVIN_API_KEY;
  if (!apiKey) {
    throw new Error("DEVIN_API_KEY missing");
  }

  const res = await fetch(`${DEVIN_BASE}/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: req.prompt,
      title: req.title,
      idempotent: req.idempotent ?? true,
      tags: req.tags ?? ["laar-ai-public-tool"],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Devin API error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = (await res.json()) as DevinSession;
  return data;
}

export async function getDevinSession(
  sessionId: string
): Promise<{ status: string; structured_output?: unknown; url: string }> {
  const apiKey = process.env.DEVIN_API_KEY;
  if (!apiKey) throw new Error("DEVIN_API_KEY missing");

  const res = await fetch(`${DEVIN_BASE}/session/${sessionId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Devin API error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  return (await res.json()) as {
    status: string;
    structured_output?: unknown;
    url: string;
  };
}
