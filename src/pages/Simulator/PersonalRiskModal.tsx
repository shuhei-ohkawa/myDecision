import type { TreatmentOption } from '../../types/treatment';
import type { MedicalCondition } from '../../types/patient';

const RISK_ADJUSTMENTS: Record<string, { multiplier: number; message: string }> = {
  糖尿病: { multiplier: 1.3, message: '血糖コントロールの状態によりリスクが変動します' },
  高血圧: { multiplier: 1.1, message: '投薬管理中であれば影響は軽微です' },
  心疾患: { multiplier: 1.4, message: '術前の循環器評価が必要です' },
};

interface Props {
  treatment: TreatmentOption;
  conditions: MedicalCondition[];
  onClose: () => void;
}

export default function PersonalRiskModal({ treatment, conditions, onClose }: Props) {
  const relevantConditions = conditions.filter((c) => RISK_ADJUSTMENTS[c.name]);

  const adjustedRisk = relevantConditions.reduce((risk, c) => {
    const adj = RISK_ADJUSTMENTS[c.name];
    return adj ? risk * adj.multiplier : risk;
  }, treatment.riskPercent);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-w-lg mx-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <h2 className="text-lg font-bold text-gray-800 mb-1">あなたへの影響</h2>
        <p className="text-sm text-gray-500 mb-4">{treatment.clinicName}</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">基本リスク</span>
            <span className="text-lg font-bold text-gray-800">{treatment.riskPercent}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">あなたの調整後リスク</span>
            <span className={`text-2xl font-bold ${adjustedRisk > 15 ? 'text-red-500' : adjustedRisk > 5 ? 'text-amber-500' : 'text-green-500'}`}>
              {adjustedRisk.toFixed(1)}%
            </span>
          </div>
        </div>

        {relevantConditions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-2">
            登録された既往歴によるリスク調整はありません
          </p>
        ) : (
          <div className="space-y-3">
            {relevantConditions.map((c) => {
              const adj = RISK_ADJUSTMENTS[c.name]!;
              const delta = treatment.riskPercent * (adj.multiplier - 1);
              const isPositive = delta > 0;
              return (
                <div key={c.id} className="flex gap-3 items-start">
                  <span className={`mt-0.5 text-lg flex-shrink-0 ${isPositive ? '⚠️' : '✓'}`}>
                    {isPositive ? '⚠️' : '✅'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {c.name}: +{delta.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">{adj.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
