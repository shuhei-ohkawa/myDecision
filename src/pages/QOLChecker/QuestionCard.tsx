import type { QOLQuestion } from '../../types/qol';

interface Props {
  question: QOLQuestion;
  current: number;
  total: number;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
}

export default function QuestionCard({ question, current, total, selectedValue, onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {current} / {total}
        </span>
        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>
      <p className="text-base font-semibold text-gray-800 mb-5 leading-relaxed">{question.text}</p>
      <div className="space-y-3">
        {question.choices.map((choice) => (
          <button
            key={choice.value}
            onClick={() => onSelect(choice.value)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-medium
              ${selectedValue === choice.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-gray-50'
              }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
