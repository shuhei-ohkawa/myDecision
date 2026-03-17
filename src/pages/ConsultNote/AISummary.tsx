interface Props {
  summary: string;
  isLoading?: boolean;
}

export default function AISummary({ summary, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-700">AI 診察要約</h3>
        </div>
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">AIが要約を生成中...</p>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  // ①②③ で始まる行に分割
  const lines = summary.split('\n').filter((l) => l.trim());

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-700">AI 診察要約</h3>
        <span className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded-full ml-auto">
          Claude生成
        </span>
      </div>
      <div className="space-y-3">
        {lines.map((line, idx) => (
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
    </div>
  );
}
