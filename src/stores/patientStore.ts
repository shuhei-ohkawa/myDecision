import { create } from 'zustand';
import type { Patient, TreatmentStatus } from '../types/patient';

interface PatientState {
  patient: Patient;
  setStatus: (status: TreatmentStatus) => void;
  setPatient: (patient: Patient) => void;
}

const DEFAULT_PATIENT: Patient = {
  id: 'demo-patient-1',
  name: '山田 花子',
  age: 58,
  medicalHistory: [
    { id: '1', name: '糖尿病', severity: 'mild' },
    { id: '2', name: '高血圧', severity: 'moderate' },
  ],
  currentStatus: 'planning',
};

export const usePatientStore = create<PatientState>((set) => ({
  patient: DEFAULT_PATIENT,
  setStatus: (status) =>
    set((state) => ({ patient: { ...state.patient, currentStatus: status } })),
  setPatient: (patient) => set({ patient }),
}));
