interface Props {
  transcription: string;
}

// Phase 2でClaude API連携予定のモックサマリー
const MOCK_SUMMARY = `① 治療方針：標準治療（B病院）を推奨。治療期間は約3ヶ月。
② 糖尿病への影響：血糖管理を継続すれば追加リスクは低い見込み。
③ 次回：2週間後に画像検査結果を持参のこと。`;

export default function AISummary({ transcription }: Props) {
  if (!transcription) return null;

  const summaryLines = MOCK_SUMMARY.split('\n').filter(Boolean);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-700">AI 診察要約</h3>
        <span className="text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full ml-auto">
          Phase 2 実装予定
        </span>
      </div>
      <div className="space-y-3">
        {summaryLines.map((line, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {line.replace(/^[①②③]\s*/, '')}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">文字起こし：{transcription}</p>
      </div>
    </div>
  );
}
