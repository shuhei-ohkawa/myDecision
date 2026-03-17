import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { transcription } = req.body as { transcription: string };

  if (!transcription) {
    return res.status(400).json({ success: false, error: 'transcription is required' });
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `以下は患者と医師の診察内容の文字起こしです。
患者が後で読み返せるよう、以下のフォーマットで3点に要約してください。

フォーマット:
① [治療方針・診断について1文]
② [患者への注意事項・リスクについて1文]
③ [次回の指示・持参物・予約について1文]

文字起こし:
${transcription}`,
        },
      ],
    });

    const summary = message.content[0].type === 'text' ? message.content[0].text : '';
    return res.status(200).json({ success: true, data: { summary } });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('summarize error:', msg);
    return res.status(500).json({ success: false, error: msg });
  }
}
