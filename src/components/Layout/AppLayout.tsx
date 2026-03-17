import { Outlet } from 'react-router-dom';
import BottomNav from '../Navigation/BottomNav';

export default function AppLayout() {
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
      <div className="fixed bottom-0 left-0 right-0 bg-amber-50 border-t border-amber-200 text-amber-800 text-xs text-center py-1 z-40" style={{ bottom: '56px' }}>
        このアプリは意思決定支援ツールです。治療方針は必ず担当医師とご相談ください。
      </div>
    </div>
  );
}
