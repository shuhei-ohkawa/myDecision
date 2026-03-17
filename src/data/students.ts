export type SubjectKey = 'japanese' | 'math' | 'science' | 'social' | 'english';

export interface SubjectData {
  name: string;
  progress: number; // 0-100
  level: number; // 1-5
  strengths: string[];
  weaknesses: string[];
  recentScore: number;
  color: string;
}

export interface Badge {
  id: string;
  emoji: string;
  label: string;
  earned: boolean;
}

export interface Student {
  id: string;
  name: string;
  grade: number;
  avatar: string;
  color: string;
  subjects: Record<SubjectKey, SubjectData>;
  weeklyStudy: boolean[]; // [日, 月, 火, 水, 木, 金, 土]
  badges: Badge[];
  totalPoints: number;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'たけし',
    grade: 3,
    avatar: '🦁',
    color: '#FF6B35',
    subjects: {
      japanese: {
        name: '国語',
        progress: 62,
        level: 3,
        strengths: ['漢字の読み', 'お話の内容理解'],
        weaknesses: ['作文', '言葉の意味'],
        recentScore: 68,
        color: '#EF4444',
      },
      math: {
        name: '算数',
        progress: 85,
        level: 4,
        strengths: ['たし算', 'ひき算', 'かけ算'],
        weaknesses: ['文章問題', '図形'],
        recentScore: 88,
        color: '#3B82F6',
      },
      science: {
        name: '理科',
        progress: 70,
        level: 3,
        strengths: ['植物のつくり', '天気'],
        weaknesses: ['実験の手順', 'グラフの読み方'],
        recentScore: 72,
        color: '#10B981',
      },
      social: {
        name: '社会',
        progress: 58,
        level: 3,
        strengths: ['地図の読み方'],
        weaknesses: ['歴史の年号', '地名'],
        recentScore: 60,
        color: '#F59E0B',
      },
      english: {
        name: '英語',
        progress: 45,
        level: 2,
        strengths: ['アルファベット', '挨拶'],
        weaknesses: ['単語の読み', '英語の文'],
        recentScore: 50,
        color: '#8B5CF6',
      },
    },
    weeklyStudy: [false, true, true, false, true, true, false],
    badges: [
      { id: 'math_star', emoji: '⭐', label: '算数マスター', earned: true },
      { id: 'study_streak', emoji: '🔥', label: '3日連続', earned: true },
      { id: 'first_chat', emoji: '💬', label: 'はじめての質問', earned: true },
      { id: 'science_pro', emoji: '🔬', label: '理科はかせ', earned: false },
      { id: 'writing_ace', emoji: '✏️', label: '作文名人', earned: false },
      { id: 'reading_champ', emoji: '📚', label: '読書チャンピオン', earned: false },
    ],
    totalPoints: 340,
  },
  {
    id: '2',
    name: 'ゆき',
    grade: 5,
    avatar: '🌟',
    color: '#8B5CF6',
    subjects: {
      japanese: {
        name: '国語',
        progress: 78,
        level: 4,
        strengths: ['読解', '作文', '詩'],
        weaknesses: ['古典', '漢字の書き'],
        recentScore: 80,
        color: '#EF4444',
      },
      math: {
        name: '算数',
        progress: 52,
        level: 2,
        strengths: ['たし算', 'ひき算'],
        weaknesses: ['分数', '小数', '速さの計算'],
        recentScore: 55,
        color: '#3B82F6',
      },
      science: {
        name: '理科',
        progress: 90,
        level: 5,
        strengths: ['電気のつながり', '植物のしくみ', '天体'],
        weaknesses: ['計算が必要な問題'],
        recentScore: 92,
        color: '#10B981',
      },
      social: {
        name: '社会',
        progress: 72,
        level: 4,
        strengths: ['歴史', '地理'],
        weaknesses: ['政治のしくみ', '時事問題'],
        recentScore: 74,
        color: '#F59E0B',
      },
      english: {
        name: '英語',
        progress: 68,
        level: 3,
        strengths: ['リスニング', '単語'],
        weaknesses: ['文法', '英作文'],
        recentScore: 70,
        color: '#8B5CF6',
      },
    },
    weeklyStudy: [true, true, false, true, true, false, true],
    badges: [
      { id: 'science_pro', emoji: '🔬', label: '理科はかせ', earned: true },
      { id: 'reading_champ', emoji: '📚', label: '読書チャンピオン', earned: true },
      { id: 'study_streak', emoji: '🔥', label: '5日連続', earned: true },
      { id: 'perfect_score', emoji: '💯', label: '満点ゲット', earned: true },
      { id: 'math_star', emoji: '⭐', label: '算数マスター', earned: false },
      { id: 'writing_ace', emoji: '✏️', label: '作文名人', earned: false },
    ],
    totalPoints: 520,
  },
  {
    id: '3',
    name: 'はな',
    grade: 2,
    avatar: '🌸',
    color: '#EC4899',
    subjects: {
      japanese: {
        name: '国語',
        progress: 75,
        level: 3,
        strengths: ['ひらがな', 'カタカナ', '音読'],
        weaknesses: ['漢字', '文章を書くこと'],
        recentScore: 76,
        color: '#EF4444',
      },
      math: {
        name: '算数',
        progress: 70,
        level: 3,
        strengths: ['たし算', 'かたち'],
        weaknesses: ['ひき算', '時計の読み方'],
        recentScore: 72,
        color: '#3B82F6',
      },
      science: {
        name: '理科',
        progress: 65,
        level: 3,
        strengths: ['生きものの観察'],
        weaknesses: ['実験の記録'],
        recentScore: 68,
        color: '#10B981',
      },
      social: {
        name: '社会',
        progress: 60,
        level: 2,
        strengths: ['町たんけん'],
        weaknesses: ['地図', 'はたらく人のしごと'],
        recentScore: 62,
        color: '#F59E0B',
      },
      english: {
        name: '英語',
        progress: 55,
        level: 2,
        strengths: ['アルファベット', '動物の名前'],
        weaknesses: ['文字を書くこと', '単語の音'],
        recentScore: 58,
        color: '#8B5CF6',
      },
    },
    weeklyStudy: [false, true, false, true, false, true, true],
    badges: [
      { id: 'first_chat', emoji: '💬', label: 'はじめての質問', earned: true },
      { id: 'study_streak', emoji: '🔥', label: '3日連続', earned: true },
      { id: 'math_star', emoji: '⭐', label: '算数マスター', earned: false },
      { id: 'science_pro', emoji: '🔬', label: '理科はかせ', earned: false },
      { id: 'reading_champ', emoji: '📚', label: '読書チャンピオン', earned: false },
      { id: 'writing_ace', emoji: '✏️', label: '作文名人', earned: false },
    ],
    totalPoints: 180,
  },
];
