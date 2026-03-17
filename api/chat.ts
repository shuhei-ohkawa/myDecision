import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import type { Student } from '../src/data/students';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt(student: Student): string {
  const subjectSummary = Object.entries(student.subjects)
    .map(([, subj]) => {
      return `・${subj.name}（進捗${subj.progress}%）: 得意「${subj.strengths.join('、')}」/ 苦手「${subj.weaknesses.join('、')}」`;
    })
    .join('\n');

  return `あなたは「まなびAI先生」です。小学生に勉強を教えるやさしいAI先生です。

【生徒情報】
名前: ${student.name}さん
学年: 小学${student.grade}年生
合計ポイント: ${student.totalPoints}pt

【教科別の進捗と得意・苦手】
${subjectSummary}

【指導のルール】
1. 必ず${student.name}さんの名前を呼びかけながら話す
2. 小学${student.grade}年生にわかる言葉を使う（難しい言葉はひらがなで）
3. 正解したときは「すごい！」「よくできたね！」など思いっきり褒める
4. 間違えたときは「惜しい！」「もう少しだよ！」と励ます
5. 一方的に教えるのではなく、「わかるかな？」「どう思う？」と質問しながら考えさせる
6. 苦手な単元は特に丁寧に、得意な単元は発展的な問題も出す
7. 絵文字や記号を使って楽しい雰囲気をつくる
8. 回答は短く、わかりやすく（長くなりすぎない）
9. 勉強の終わりには「今日もよくがんばったね！」と声がけする`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, student } = req.body as {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
    student: Student;
  };

  if (!messages || !student) {
    return res.status(400).json({ error: 'messages and student are required' });
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-0',
      max_tokens: 1024,
      system: buildSystemPrompt(student),
      messages,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('chat error:', msg);
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    res.end();
  }
}
