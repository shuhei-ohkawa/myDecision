import type { QOLQuestion } from '../types/qol';

export const QOL_QUESTIONS: QOLQuestion[] = [
  {
    id: 'q1',
    text: '今のあなたにとって、1ヶ月の入院と100万円の出費、どちらが許容できますか？',
    category: 'time',
    choices: [
      {
        value: 'prefer_hospital',
        label: '入院の方がまだよい',
        scores: { early_return: -2, cost_saving: 2, short_hospital: -1 },
      },
      {
        value: 'prefer_cost',
        label: '出費の方がまだよい',
        scores: { early_return: 2, cost_saving: -2, short_hospital: 1 },
      },
      {
        value: 'neither',
        label: 'どちらも難しい',
        scores: { high_efficacy: 1, low_side_effects: 1 },
      },
    ],
  },
  {
    id: 'q2',
    text: '治療中の副作用（吐き気・倦怠感など）とその後の完全回復、どちらを優先しますか？',
    category: 'risk',
    choices: [
      {
        value: 'avoid_side_effects',
        label: '副作用を避けたい',
        scores: { low_side_effects: 3, quality_of_life: 2 },
      },
      {
        value: 'want_recovery',
        label: '完全回復を優先する',
        scores: { high_efficacy: 3, low_side_effects: -1 },
      },
      {
        value: 'balance',
        label: 'バランスが大事',
        scores: { quality_of_life: 2, high_efficacy: 1 },
      },
    ],
  },
  {
    id: 'q3',
    text: '仕事や日常生活への早期復帰と治療の確実性、どちらが重要ですか？',
    category: 'time',
    choices: [
      {
        value: 'early_return',
        label: '早期復帰が最優先',
        scores: { early_return: 3, short_hospital: 2 },
      },
      {
        value: 'certainty',
        label: '治療の確実性が最優先',
        scores: { high_efficacy: 3, early_return: -1 },
      },
      {
        value: 'same',
        label: '同じくらい重要',
        scores: { early_return: 1, high_efficacy: 1, quality_of_life: 1 },
      },
    ],
  },
  {
    id: 'q4',
    text: '治療費が高くても成功率が高い治療と、費用が安くて標準的な治療、どちらを選びますか？',
    category: 'cost',
    choices: [
      {
        value: 'high_success',
        label: '費用が高くても成功率優先',
        scores: { high_efficacy: 3, cost_saving: -2 },
      },
      {
        value: 'standard',
        label: '費用を抑えた標準治療',
        scores: { cost_saving: 3, high_efficacy: -1 },
      },
      {
        value: 'depends',
        label: '費用差による',
        scores: { cost_saving: 1, high_efficacy: 1 },
      },
    ],
  },
  {
    id: 'q5',
    text: '治療後の生活の質（QOL）の維持と、治療の短期集中化、どちらを好みますか？',
    category: 'lifestyle',
    choices: [
      {
        value: 'qol',
        label: '日常生活の質を維持したい',
        scores: { quality_of_life: 3, low_side_effects: 2 },
      },
      {
        value: 'intensive',
        label: '短期間で集中して治療したい',
        scores: { short_hospital: 2, early_return: 2, quality_of_life: -1 },
      },
      {
        value: 'gradual',
        label: 'ゆっくりでも確実に',
        scores: { high_efficacy: 2, quality_of_life: 1 },
      },
    ],
  },
  {
    id: 'q6',
    text: '入院日数と外来通院の回数、どちらを減らしたいですか？',
    category: 'time',
    choices: [
      {
        value: 'less_hospital',
        label: '入院日数を減らしたい',
        scores: { short_hospital: 3, early_return: 1 },
      },
      {
        value: 'less_outpatient',
        label: '通院回数を減らしたい',
        scores: { quality_of_life: 2, early_return: 2 },
      },
      {
        value: 'either',
        label: 'どちらでもよい',
        scores: { high_efficacy: 1, cost_saving: 1 },
      },
    ],
  },
];
