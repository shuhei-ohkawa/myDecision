import { useState, useRef, useEffect } from 'react';
import { useStudent } from '../contexts/StudentContext';
import { useAIChat } from '../hooks/useAIChat';

export default function ChatSection() {
  const { activeStudent } = useStudent();
  const { messages, isLoading, error, sendMessage, clearMessages } = useAIChat(activeStudent);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const quickQuestions = [
    '算数を教えて',
    '漢字の練習がしたい',
    '今日の宿題を手伝って',
    '苦手なところを教えて',
  ];

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow"
              style={{ backgroundColor: activeStudent.color }}
            >
              AI
            </div>
            <div>
              <h3 className="font-bold text-gray-800">まなびAI先生</h3>
              <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                {activeStudent.name}さんの専属AI先生
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              会話をリセット
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="text-5xl mb-4">{activeStudent.avatar}</div>
            <h4 className="text-xl font-bold text-gray-700 mb-2">
              {activeStudent.name}さん、こんにちは！
            </h4>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              なんでも聞いてね！一緒にたのしく勉強しよう！
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-sm bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-xl transition-all duration-150 text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold shadow
                  ${msg.role === 'user'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600'
                  }
                `}
                style={msg.role === 'user' ? { backgroundColor: activeStudent.color } : {}}
              >
                {msg.role === 'user' ? activeStudent.avatar : 'AI'}
              </div>
              <div
                className={`
                  max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user'
                    ? 'text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                  }
                `}
                style={msg.role === 'user' ? { backgroundColor: activeStudent.color } : {}}
              >
                {msg.content === '' && msg.role === 'assistant' ? (
                  <span className="flex gap-1 items-center py-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                ) : (
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                )}
              </div>
            </div>
          ))
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
            エラー: {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${activeStudent.name}さん、何を聞きたい？`}
            rows={1}
            className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder-gray-400 py-2 px-1 max-h-32 overflow-y-auto"
            style={{ lineHeight: '1.5' }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold
              transition-all duration-200 flex-shrink-0
              ${(!input.trim() || isLoading) ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-md'}
            `}
            style={{ backgroundColor: activeStudent.color }}
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              '↑'
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">Enter で送信 / Shift+Enter で改行</p>
      </form>
    </div>
  );
}
