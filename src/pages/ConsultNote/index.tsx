import { useState, useEffect } from 'react';
import { usePatientStore } from '../../stores/patientStore';
import { useTreatmentStore } from '../../stores/treatmentStore';
import { useQOLStore } from '../../stores/qolStore';
import { QOL_PRIORITY_LABELS } from '../../types/qol';
import { generateQuestions, summarizeTranscription } from '../../api/ai';
import QuestionList from './QuestionList';
import RecordingBar from './RecordingBar';
import AISummary from './AISummary';

const FALLBACK_QUESTIONS = [
  'この治療の成功率と根拠となるデータを教えてください',
  '私の既往歴への影響はどの程度ですか？',
  '治療中に仕事を続けることはできますか？',
  '治療後の経過観察はどのような頻度で行いますか？',
  '他の選択肢と比べて、この治療を勧める理由は何ですか？',
];

export default function ConsultNotePage() {
  const { patient } = usePatientStore();
  const { treatments } = useTreatmentStore();
  const { scores } = useQOLStore();

  const [questions, setQuestions] = useState<string[]>(FALLBACK_QUESTIONS);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questionsGenerated, setQuestionsGenerated] = useState(false);

  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  // 患者情報が揃っていれば自動生成
  useEffect(() => {
    if (questionsGenerated) return;
    handleGenerateQuestions();
  }, []);

  const handleGenerateQuestions = async () => {
    setIsLoadingQuestions(true);
    try {
      const topPriorities = [...scores]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((s) => QOL_PRIORITY_LABELS[s.priority]);

      const generated = await generateQuestions({
        age: patient.age,
        conditions: patient.medicalHistory.map((c) => c.name),
        treatments: treatments.map((t) => t.clinicName),
        topPriorities: topPriorities.length > 0 ? topPriorities : ['治療効果', '副作用の低さ', '費用'],
      });
      setQuestions(generated);
      setQuestionsGenerated(true);
    } catch {
      // フォールバック質問をそのまま使用
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleSummarize = async () => {
    if (!transcription.trim()) return;
    setIsLoadingSummary(true);
    setSummary('');
    try {
      const result = await summarizeTranscription(transcription);
      setSummary(result);
    } catch {
      setSummary('要約の生成に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-bold text-gray-800">診察準備ノート</h1>
        <p className="text-xs text-gray-500">質問リストの管理と診察内容の要約</p>
      </div>

      {/* 質問リスト */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">AI生成 質問リスト</span>
          <button
            onClick={handleGenerateQuestions}
            disabled={isLoadingQuestions}
            className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors"
          >
            {isLoadingQuestions ? '生成中...' : '再生成'}
          </button>
        </div>
        <QuestionList
          questions={questions}
          isLoading={isLoadingQuestions}
          onAddQuestion={(q) => setQuestions((prev) => [...prev, q])}
        />
      </div>

      {/* 録音 */}
      <RecordingBar onTranscription={(text) => setTranscription(text)} />

      {/* 手動入力 + 要約 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-gray-500">診察メモ・文字起こし</h3>
        <textarea
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder="診察中に気になったことや、録音の内容をここに入力してください..."
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
        />
        <button
          onClick={handleSummarize}
          disabled={!transcription.trim() || isLoadingSummary}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-colors
            ${transcription.trim() && !isLoadingSummary
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {isLoadingSummary ? 'AIが要約中...' : 'AIで要約する'}
        </button>
      </div>

      <AISummary summary={summary} isLoading={isLoadingSummary} />

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs text-amber-700 leading-relaxed">
          このアプリは意思決定を支援するための情報ツールです。治療方針は必ず担当医師とご相談ください。
        </p>
      </div>
    </div>
  );
}
