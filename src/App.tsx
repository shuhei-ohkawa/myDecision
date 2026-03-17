import { useState } from 'react';
import { StudentProvider } from './contexts/StudentContext';
import StudentSelector from './components/StudentSelector';
import Dashboard from './components/Dashboard';
import ChatSection from './components/ChatSection';
import RecommendSection from './components/RecommendSection';

type Tab = 'dashboard' | 'chat' | 'recommend';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'dashboard', label: 'ダッシュボード', emoji: '📊' },
  { id: 'chat', label: 'AI先生', emoji: '💬' },
  { id: 'recommend', label: 'おすすめ課題', emoji: '🎯' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🎓</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">まなびAI</h1>
              <p className="text-xs text-gray-500">あなただけのAI先生</p>
            </div>
          </div>
          <StudentSelector />
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[100px] z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-3 text-sm font-medium transition-all duration-200
                  flex items-center justify-center gap-1.5
                  border-b-2
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'chat' && <ChatSection />}
        {activeTab === 'recommend' && <RecommendSection />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
