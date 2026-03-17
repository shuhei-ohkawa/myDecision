import { useState } from 'react';
import { useTreatmentStore } from '../../stores/treatmentStore';
import { usePatientStore } from '../../stores/patientStore';
import TreatmentCard from './TreatmentCard';
import PersonalRiskModal from './PersonalRiskModal';
import type { TreatmentOption } from '../../types/treatment';

export default function SimulatorPage() {
  const { treatments } = useTreatmentStore();
  const { patient } = usePatientStore();
  const [selectedForRisk, setSelectedForRisk] = useState<TreatmentOption | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-bold text-gray-800">治療選択シミュレーター</h1>
        <p className="text-xs text-gray-500">複数の治療選択肢を比較して、あなたに合った選択を</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 mb-2">リスク表示の目安</p>
        <div className="flex gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> 5%未満：低リスク
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> 5〜15%：中リスク
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> 15%超：高リスク
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {treatments.map((t) => (
          <TreatmentCard
            key={t.id}
            treatment={t}
            onRiskCheck={() => setSelectedForRisk(t)}
          />
        ))}
      </div>

      {selectedForRisk && (
        <PersonalRiskModal
          treatment={selectedForRisk}
          conditions={patient.medicalHistory}
          onClose={() => setSelectedForRisk(null)}
        />
      )}
    </div>
  );
}
