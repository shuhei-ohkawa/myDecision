import { useState, useRef, useEffect } from 'react';

interface Props {
  onTranscription: (text: string) => void;
}

export default function RecordingBar({ onTranscription }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        // Phase 2でWhisper API連携予定（Blob: new Blob(chunksRef.current, { type: 'audio/webm' })）
        onTranscription('[録音完了 - AI文字起こし機能はPhase 2で実装予定]');
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setSeconds(0);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      alert('マイクへのアクセスが許可されていません');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border transition-colors ${isRecording ? 'border-red-200' : 'border-gray-100'}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
            ${isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {isRecording ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">
            {isRecording ? '録音中...' : '診察を録音する'}
          </p>
          <p className="text-xs text-gray-400">
            {isRecording ? formatTime(seconds) : 'ボタンを押して開始'}
          </p>
        </div>
        {isRecording && (
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-red-400 rounded-full animate-bounce"
                style={{ height: `${8 + Math.random() * 16}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
