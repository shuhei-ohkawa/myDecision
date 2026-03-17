import { useState } from 'react';
import QuestionList from './QuestionList';
import RecordingBar from './RecordingBar';
import AISummary from './AISummary';

export default function ConsultNotePage() {
  const [transcription, setTranscription] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-bold text-gray-800">診察準備ノート</h1>
        <p className="text-xs text-gray-500">質問リストの管理と診察の録音・要約</p>
      </div>

      <QuestionList />
      <RecordingBar onTranscription={setTranscription} />
      {transcription && <AISummary transcription={transcription} />}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs text-amber-700 leading-relaxed">
          録音データは端末内にのみ保存されます。Phase 2でクラウド保存・AI要約機能を実装予定です。
        </p>
      </div>
    </div>
  );
}
