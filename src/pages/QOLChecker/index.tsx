import { useState } from 'react';
import { useQOLStore, QOL_PRIORITIES } from '../../stores/qolStore';
import { QOL_QUESTIONS } from '../../data/qolQuestions';
import { QOL_PRIORITY_LABELS } from '../../types/qol';
import QuestionCard from './QuestionCard';
import ResultView from './ResultView';
import type { QOLScore } from '../../types/qol';

export default function QOLCheckerPage() {
  const { answers, scores, isCompleted, setAnswer, setScores, setCompleted, reset } = useQOLStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = QOL_QUESTIONS[currentIndex];

  const handleSelect = (value: string) => {
    setAnswer(currentQuestion.id, value);
  };

  const handleNext = () => {
    if (currentIndex < QOL_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // 集計
      const totals: Record<string, number> = {};
      QOL_PRIORITIES.forEach((p) => (totals[p] = 0));

      QOL_QUESTIONS.forEach((q) => {
        const selected = answers[q.id];
        if (!selected) return;
        const choice = q.choices.find((c) => c.value === selected);
        if (!choice) return;
        Object.entries(choice.scores).forEach(([p, score]) => {
          totals[p] = (totals[p] ?? 0) + (score ?? 0);
        });
      });

      // 0〜100に正規化
      const values = Object.values(totals);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;

      const result: QOLScore[] = QOL_PRIORITIES.map((p) => ({
        priority: p,
        label: QOL_PRIORITY_LABELS[p],
        score: Math.round(((totals[p] - min) / range) * 100),
      }));

      setScores(result);
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleRedo = () => {
    reset();
    setCurrentIndex(0);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 space-y-4">
        <div className="pt-2">
          <h1 className="text-lg font-bold text-gray-800">価値観診断 結果</h1>
          <p className="text-xs text-gray-500">あなたが最も重視する治療への価値観</p>
        </div>
        <ResultView scores={scores} onRedo={handleRedo} />
      </div>
    );
  }

  const selectedValue = answers[currentQuestion.id];
  const canProceed = !!selectedValue;

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-bold text-gray-800">価値観診断（QOLチェッカー）</h1>
        <p className="text-xs text-gray-500">あなたが大切にしていることを教えてください</p>
      </div>

      <QuestionCard
        question={currentQuestion}
        current={currentIndex + 1}
        total={QOL_QUESTIONS.length}
        selectedValue={selectedValue}
        onSelect={handleSelect}
      />

      <div className="flex gap-3">
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="flex-1 border border-gray-300 text-gray-600 rounded-2xl py-3 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            戻る
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex-1 rounded-2xl py-3 font-medium text-sm transition-colors
            ${canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {currentIndex === QOL_QUESTIONS.length - 1 ? '結果を見る' : '次へ'}
        </button>
      </div>
    </div>
  );
}
