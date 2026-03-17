import type { TreatmentStatus } from '../../types/patient';

const STATUS_CONFIG: Record<TreatmentStatus, { text: string; badgeColor: string; bgColor: string }> = {
  initial_exam: {
    text: '初診完了。検査の予約をしてください',
    badgeColor: 'bg-blue-100 text-blue-700',
    bgColor: 'border-blue-200',
  },
  exam_complete: {
    text: '検査完了。現在、治療方針を検討中',
    badgeColor: 'bg-amber-100 text-amber-700',
    bgColor: 'border-amber-200',
  },
  planning: {
    text: '医師からの提案が届いています',
    badgeColor: 'bg-red-100 text-red-700',
    bgColor: 'border-red-200',
  },
  treatment_started: {
    text: '治療中',
    badgeColor: 'bg-green-100 text-green-700',
    bgColor: 'border-green-200',
  },
  follow_up: {
    text: '経過観察中',
    badgeColor: 'bg-gray-100 text-gray-600',
    bgColor: 'border-gray-200',
  },
};

interface Props {
  name: string;
  age: number;
  status: TreatmentStatus;
}

export default function StatusCard({ name, age, status }: Props) {
  const config = STATUS_CONFIG[status];
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border ${config.bgColor}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500">{age}歳</p>
          <h2 className="text-xl font-bold text-gray-800">{name} さん</h2>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${config.badgeColor}`}>
          現在のステータス
        </span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{config.text}</p>
    </div>
  );
}
