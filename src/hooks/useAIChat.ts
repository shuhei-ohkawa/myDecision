import { useState, useCallback } from 'react';
import type { Student } from '../data/students';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useAIChat(student: Student) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    const assistantMsgId = crypto.randomUUID();
    setMessages(prev => [
      ...prev,
      { id: assistantMsgId, role: 'assistant', content: '', timestamp: new Date() },
    ]);

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, student }),
      });

      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status}`);
      }

      if (!response.body) throw new Error('レスポンスが空です');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const { text } = JSON.parse(data) as { text: string };
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantMsgId ? { ...m, content: m.content + text } : m,
              ),
            );
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'エラーが発生しました';
      setError(msg);
      setMessages(prev => prev.filter(m => m.id !== assistantMsgId));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, student]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
}
