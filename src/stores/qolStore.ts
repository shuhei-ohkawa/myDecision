import { create } from 'zustand';
import type { QOLPriority, QOLScore } from '../types/qol';

interface QOLState {
  answers: Record<string, string>;
  scores: QOLScore[];
  isCompleted: boolean;
  setAnswer: (questionId: string, value: string) => void;
  setScores: (scores: QOLScore[]) => void;
  setCompleted: (v: boolean) => void;
  reset: () => void;
}

export const useQOLStore = create<QOLState>((set) => ({
  answers: {},
  scores: [],
  isCompleted: false,
  setAnswer: (questionId, value) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: value } })),
  setScores: (scores) => set({ scores }),
  setCompleted: (v) => set({ isCompleted: v }),
  reset: () => set({ answers: {}, scores: [], isCompleted: false }),
}));

export const QOL_PRIORITIES: QOLPriority[] = [
  'early_return',
  'low_side_effects',
  'cost_saving',
  'short_hospital',
  'high_efficacy',
  'quality_of_life',
];
