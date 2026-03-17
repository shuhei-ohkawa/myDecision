export type QOLPriority =
  | 'early_return'
  | 'low_side_effects'
  | 'cost_saving'
  | 'short_hospital'
  | 'high_efficacy'
  | 'quality_of_life';

export const QOL_PRIORITY_LABELS: Record<QOLPriority, string> = {
  early_return: '早期社会復帰',
  low_side_effects: '副作用の低さ',
  cost_saving: '費用の抑制',
  short_hospital: '入院期間の短さ',
  high_efficacy: '治療効果の高さ',
  quality_of_life: '日常生活の質',
};

export interface QOLQuestion {
  id: string;
  text: string;
  category: 'time' | 'cost' | 'risk' | 'lifestyle';
  choices: {
    value: string;
    label: string;
    scores: Partial<Record<QOLPriority, number>>;
  }[];
}

export interface QOLScore {
  priority: QOLPriority;
  label: string;
  score: number;
}
