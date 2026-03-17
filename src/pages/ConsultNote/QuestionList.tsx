import { useState } from 'react';

interface Props {
  questions: string[];
  isLoading?: boolean;
  onAddQuestion: (q: string) => void;
}

export default function QuestionList({ questions, isLoading, onAddQuestion }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [newQuestion, setNewQuestion] = useState('');

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const handleAdd = () => {
    const q = newQuestion.trim();
    if (q) {
      onAddQuestion(q);
      setNewQuestion('');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-500 mb-4">
        質問リスト（{checked.size}/{questions.length} 確認済み）
      </h3>

      {isLoading ? (
        <div className="flex flex-col items-center py-8 gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">AIが質問を生成中...</p>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => toggle(idx)}
              className={`w-full flex items-start gap-3 text-left p-3 rounded-xl border transition-all
                ${checked.has(idx) ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                ${checked.has(idx) ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                {checked.has(idx) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm leading-relaxed ${checked.has(idx) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {q}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="質問を追加..."
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          追加
        </button>
      </div>
    </div>
  );
}
