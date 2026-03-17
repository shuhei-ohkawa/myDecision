const BASE = import.meta.env.VITE_API_BASE ?? '';

export async function generateQuestions(params: {
  age: number;
  conditions: string[];
  treatments: string[];
  topPriorities: string[];
}): Promise<string[]> {
  const res = await fetch(`${BASE}/api/generate-questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const json = await res.json() as { success: boolean; data: { questions: string[] } };
  return json.data.questions;
}

export async function summarizeTranscription(transcription: string): Promise<string> {
  const res = await fetch(`${BASE}/api/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcription }),
  });
  const json = await res.json() as { success: boolean; data: { summary: string } };
  return json.data.summary;
}
