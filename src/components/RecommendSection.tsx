import { useState } from 'react';
import { useStudent } from '../contexts/StudentContext';
import type { Recommendation } from '../../api/recommend';

const DIFFICULTY_COLORS: Record<string, string> = {
  'かんたん': 'bg-green-100 text-green-700 border-green-200',
  'ふつう': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'むずかしい': 'bg-red-100 text-red-700 border-red-200',
};

export default function RecommendSection() {
  const { activeStudent } = useStudent();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student: activeStudent }),
      });

      if (!res.ok) throw new Error(`エラー: ${res.status}`);

      const json = await res.json() as { success: boolean; data: Recommendation[] };
      setRecommendations(json.data);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${activeStudent.color}, ${activeStudent.color}99)` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{activeStudent.avatar}</span>
          <div>
            <h2 className="text-xl font-bold">{activeStudent.name}さんへの学習課題</h2>
            <p className="text-sm text-white text-opacity-90">
              苦手な単元を中心に、今日のおすすめ課題をAIが提案します
            </p>
          </div>
        </div>
        <button
          onClick={fetchRecommendations}
          disabled={isLoading}
          className="mt-2 bg-white text-gray-800 font-bold px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all duration-200 disabled:opacity-60 flex items-center gap-2 shadow"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              AIが考え中...
            </>
          ) : (
            <>
              <span>✨</span>
              {loaded ? '課題を更新する' : '今日の課題を見る'}
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Weak Points Summary */}
      {!loaded && !isLoading && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>📋</span> 苦手な単元
          </h3>
          <div className="space-y-3">
            {Object.entries(activeStudent.subjects).map(([, subj]) => (
              subj.weaknesses.length > 0 ? (
                <div key={subj.name} className="flex items-start gap-3">
                  <span
                    className="text-xs px-2 py-1 rounded-lg text-white font-medium flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: subj.color }}
                  >
                    {subj.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {subj.weaknesses.map(w => (
                      <span
                        key={w}
                        className="text-sm text-orange-700 bg-orange-50 px-2 py-1 rounded-lg border border-orange-200"
                      >
                        ▲ {w}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            上のボタンを押して、今日の学習課題をAIに提案してもらおう！
          </p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <span>🎯</span> 今日のおすすめ課題
          </h3>
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{rec.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="font-bold text-gray-800 text-lg">{rec.unit}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {rec.subject}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{rec.reason}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border font-medium ${DIFFICULTY_COLORS[rec.difficulty] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}
                    >
                      {rec.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <span>⏱</span> 約{rec.estimatedMinutes}分
                    </span>
                  </div>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: activeStudent.color }}
                >
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
