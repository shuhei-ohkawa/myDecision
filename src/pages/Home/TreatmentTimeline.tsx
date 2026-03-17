import type { TreatmentStatus } from '../../types/patient';

const STEPS: { id: TreatmentStatus; label: string }[] = [
  { id: 'initial_exam', label: '初診' },
  { id: 'exam_complete', label: '検査' },
  { id: 'planning', label: '方針検討' },
  { id: 'treatment_started', label: '治療開始' },
  { id: 'follow_up', label: '経過観察' },
];

const STATUS_ORDER: TreatmentStatus[] = [
  'initial_exam',
  'exam_complete',
  'planning',
  'treatment_started',
  'follow_up',
];

interface Props {
  currentStatus: TreatmentStatus;
}

export default function TreatmentTimeline({ currentStatus }: Props) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-500 mb-4">治療の進捗</h3>
      <div className="flex items-center">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              {idx < STEPS.length - 1 && (
                <div
                  className={`absolute top-3 left-1/2 w-full h-0.5 ${isDone || isCurrent ? 'bg-blue-400' : 'bg-gray-200'}`}
                />
              )}
              <div
                className={`w-6 h-6 rounded-full z-10 flex items-center justify-center text-xs font-bold
                  ${isDone ? 'bg-blue-500 text-white' : isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-200 text-gray-400'}`}
              >
                {isDone ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs text-center leading-tight ${isCurrent ? 'text-blue-600 font-semibold' : isDone ? 'text-gray-500' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
