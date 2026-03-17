import { Link } from 'react-router-dom';
import type { TreatmentStatus } from '../../types/patient';

const ACTIONS: Record<TreatmentStatus, { message: string; linkTo: string; linkLabel: string } | null> = {
  initial_exam: { message: '検査の予約をして結果を待ちましょう', linkTo: '/notes', linkLabel: 'ノートを作成' },
  exam_complete: { message: '治療の選択肢を比較してみましょう', linkTo: '/simulator', linkLabel: '比較する' },
  planning: { message: '提案された治療を確認し、質問リストを準備しましょう', linkTo: '/notes', linkLabel: '質問を準備' },
  treatment_started: null,
  follow_up: null,
};

interface Props {
  status: TreatmentStatus;
}

export default function ActionAlert({ status }: Props) {
  const action = ACTIONS[status];
  if (!action) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-blue-800">{action.message}</p>
      </div>
      <Link
        to={action.linkTo}
        className="text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded-lg px-3 py-1.5 flex-shrink-0 hover:bg-blue-50 transition-colors"
      >
        {action.linkLabel}
      </Link>
    </div>
  );
}
