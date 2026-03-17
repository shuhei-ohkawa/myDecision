import type { TreatmentOption } from '../../types/treatment';

function RiskBadge({ percent }: { percent: number }) {
  const color =
    percent < 5 ? 'bg-green-100 text-green-700' :
    percent <= 15 ? 'bg-amber-100 text-amber-700' :
    'bg-red-100 text-red-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold ${color}`}>
      {percent}%
    </span>
  );
}

interface Props {
  treatment: TreatmentOption;
  onRiskCheck: () => void;
}

export default function TreatmentCard({ treatment, onRiskCheck }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-1">{treatment.clinicName}</h3>
      <p className="text-xs text-gray-500 mb-4">{treatment.treatmentType}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">期待効果</p>
          <p className="text-sm font-semibold text-blue-700">{treatment.expectedEffect}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">リスク</p>
          <RiskBadge percent={treatment.riskPercent} />
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">休業期間</p>
          <p className="text-sm font-semibold text-gray-700">{treatment.downtimeWeeks}週間</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">費用</p>
          {treatment.insuranceCovered ? (
            <p className="text-sm font-semibold text-green-700">
              保険 {treatment.insuranceCopayPercent}割
            </p>
          ) : (
            <p className="text-sm font-semibold text-gray-700">
              {treatment.totalCostYen ? `${(treatment.totalCostYen / 10000).toFixed(0)}万円` : '要相談'}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onRiskCheck}
        className="w-full border border-blue-300 text-blue-600 rounded-xl py-2.5 text-sm font-medium hover:bg-blue-50 transition-colors"
      >
        私への影響を確認する
      </button>
    </div>
  );
}
