export type TreatmentStatus =
  | 'initial_exam'
  | 'exam_complete'
  | 'planning'
  | 'treatment_started'
  | 'follow_up';

export interface MedicalCondition {
  id: string;
  name: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  medicalHistory: MedicalCondition[];
  currentStatus: TreatmentStatus;
}
