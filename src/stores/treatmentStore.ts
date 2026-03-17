import { create } from 'zustand';
import type { TreatmentOption } from '../types/treatment';

interface TreatmentState {
  treatments: TreatmentOption[];
  selectedId: string | null;
  setSelected: (id: string) => void;
}

const DEMO_TREATMENTS: TreatmentOption[] = [
  {
    id: 't1',
    clinicName: 'Aクリニック 幹細胞治療',
    treatmentType: '幹細胞治療',
    expectedEffect: '改善率 80%',
    riskPercent: 15,
    downtimeWeeks: 2,
    totalCostYen: 1500000,
    insuranceCovered: false,
  },
  {
    id: 't2',
    clinicName: 'B病院 標準治療',
    treatmentType: '標準治療',
    expectedEffect: '改善率 65%',
    riskPercent: 5,
    downtimeWeeks: 1,
    totalCostYen: null,
    insuranceCovered: true,
    insuranceCopayPercent: 30,
  },
  {
    id: 't3',
    clinicName: 'C医療センター 免疫療法',
    treatmentType: '免疫療法',
    expectedEffect: '改善率 72%',
    riskPercent: 10,
    downtimeWeeks: 3,
    totalCostYen: 800000,
    insuranceCovered: false,
  },
];

export const useTreatmentStore = create<TreatmentState>((set) => ({
  treatments: DEMO_TREATMENTS,
  selectedId: null,
  setSelected: (id) => set({ selectedId: id }),
}));
