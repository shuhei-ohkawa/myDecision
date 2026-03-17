import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import type { Student } from '../src/data/students';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface Recommendation {
  subject: string;
  subjectKey: string;
  unit: string;
  reason: string;
  difficulty: 'かんたん' | 'ふつう' | 'むずかしい';
  estimatedMinutes: number;
  emoji: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { student } = req.body as { student: Student };

  if (!student) {
    return res.status(400).json({ error: 'student is required' });
  }

  const subjectSummary = Object.entries(student.subjects)
    .map(([key, subj]) => {
      return `${key}: ${subj.name} 進捗${subj.progress}% 苦手「${subj.weaknesses.join('、')}」`;
    })
    .join('\n');

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-0',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `小学${student.grade}年生の${student.name}さんへの学習課題をレコメンドしてください。

【教科別進捗・苦手】
${subjectSummary}

苦手な単元を優先して、今日取り組むべき3つの学習課題を提案してください。
以下のJSON形式のみで返答してください（説明文は不要）:

[
  {
    "subject": "教科名（日本語）",
    "subjectKey": "japanese|math|science|social|english",
    "unit": "具体的な単元名（短く）",
    "reason": "なぜこれを勉強するといいか（${student.name}さんに向けた一言）",
    "difficulty": "かんたん|ふつう|むずかしい",
    "estimatedMinutes": 数値（10-30）,
    "emoji": "絵文字1つ"
  }
]`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '[]';

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse recommendations' });
    }

    const recommendations: Recommendation[] = JSON.parse(jsonMatch[0]);
    return res.status(200).json({ success: true, data: recommendations });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('recommend error:', msg);
    return res.status(500).json({ error: msg });
  }
}
