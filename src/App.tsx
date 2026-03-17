import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './pages/Home';
import SimulatorPage from './pages/Simulator';
import QOLCheckerPage from './pages/QOLChecker';
import ConsultNotePage from './pages/ConsultNote';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/qol" element={<QOLCheckerPage />} />
          <Route path="/notes" element={<ConsultNotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
