import { Button, Grid } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
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
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
