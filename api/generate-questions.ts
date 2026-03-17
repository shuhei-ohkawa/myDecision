import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { age, conditions, treatments, topPriorities } = req.body as {
    age: number;
    conditions: string[];
    treatments: string[];
    topPriorities: string[];
  };

  if (!age || !conditions || !treatments || !topPriorities) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `患者情報:
- 年齢: ${age}歳
- 既往歴: ${conditions.length > 0 ? conditions.join('、') : 'なし'}
- 検討中の治療: ${treatments.join('、')}
- 重視する点: ${topPriorities.join('、')}

次の診察で医師に確認すべき質問を5つ生成してください。
患者の個別状況を反映した具体的な質問にしてください。
必ず以下のJSON形式のみで返してください（余分なテキスト不要）:
{"questions": ["質問1", "質問2", "質問3", "質問4", "質問5"]}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid response format');
    const parsed = JSON.parse(jsonMatch[0]) as { questions: string[] };

    return res.status(200).json({ success: true, data: { questions: parsed.questions } });
  } catch (error) {
    console.error('generate-questions error:', error);
    return res.status(500).json({
      success: false,
      error: 'AI質問生成に失敗しました',
      // フォールバック質問
      data: {
        questions: [
          'この治療の成功率と根拠となるデータを教えてください',
          '私の既往歴（糖尿病・高血圧）への影響はどの程度ですか？',
          '治療中に仕事を続けることはできますか？',
          '治療後の経過観察はどのような頻度で行いますか？',
          '他の選択肢と比べて、この治療を勧める理由は何ですか？',
        ],
      },
    });
  }
}
