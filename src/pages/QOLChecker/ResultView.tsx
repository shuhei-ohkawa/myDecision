import PriorityRadar from './PriorityRadar';
import type { QOLScore } from '../../types/qol';

const RANK_COLORS = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];
const RANK_LABELS = ['1位', '2位', '3位'];

interface Props {
  scores: QOLScore[];
  onRedo: () => void;
}

export default function ResultView({ scores, onRedo }: Props) {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 mb-1">あなたの優先度マップ</h3>
        <PriorityRadar scores={scores} />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 mb-4">優先度ランキング</h3>
        <div className="space-y-3">
          {top3.map((s, idx) => (
            <div key={s.priority} className="flex items-center gap-3">
              <span className={`text-lg font-bold w-8 ${RANK_COLORS[idx]}`}>
                {RANK_LABELS[idx]}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{s.label}</span>
                  <span className="text-xs text-gray-500">{s.score}pt</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (s.score / sorted[0].score) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRedo}
        className="w-full border border-gray-300 text-gray-600 rounded-2xl py-3 font-medium text-sm hover:bg-gray-50 transition-colors"
      >
        もう一度診断する
      </button>
    </div>
  );
}
