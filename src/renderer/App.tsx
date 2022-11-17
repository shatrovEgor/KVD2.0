import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

// Pages
import DiagrammPage from './page/DiagrammPage';
import EnginePage from './page/EnginePage';
import FormsPage from './page/FormsPage';
import ResonancePage from './page/ResonancePage';
import SettingsPage from './page/SettingsPage';
import StrainPage from './page/StrainPage';
import SystemPage from './page/SystemPage';
import MenuDrawer from './ui-comopnents/MainMenu';

const Hello = () => {
  return (
    <div>
      <MenuDrawer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Hello />
      <Routes>
        <Route path="/" element={<EnginePage />} />
        <Route path="/system" element={<SystemPage />} />
        <Route path="/diagramm" element={<DiagrammPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/resonance" element={<ResonancePage />} />
        <Route path="/strain" element={<StrainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}
