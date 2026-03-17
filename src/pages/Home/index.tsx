import { usePatientStore } from '../../stores/patientStore';
import StatusCard from './StatusCard';
import ActionAlert from './ActionAlert';
import TreatmentTimeline from './TreatmentTimeline';

export default function HomePage() {
  const { patient } = usePatientStore();

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-bold text-gray-800">MyDecision</h1>
        <p className="text-xs text-gray-500">あなたの治療選択を支援します</p>
      </div>
      <StatusCard
        name={patient.name}
        age={patient.age}
        status={patient.currentStatus}
      />
      <ActionAlert status={patient.currentStatus} />
      <TreatmentTimeline currentStatus={patient.currentStatus} />
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">既往歴</h3>
        <div className="flex flex-wrap gap-2">
          {patient.medicalHistory.map((c) => (
            <span
              key={c.id}
              className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-3 py-1 rounded-full"
            >
              {c.name}
              {c.severity && (
                <span className="ml-1 text-orange-400">
                  ({c.severity === 'mild' ? '軽度' : c.severity === 'moderate' ? '中等度' : '重度'})
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
