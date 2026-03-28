import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts';
import LandingPage from './pages/LandingPage';
import HeritageHotelPage from './pages/HeritageHotelPage';
import PalacePage from './pages/PalacePage';
import BhojnalayPage from './pages/BhojnalayPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/shree-banke-bihari-heritage" element={<MainLayout><HeritageHotelPage /></MainLayout>} />
        <Route path="/shree-banke-bihari-palace" element={<MainLayout><PalacePage /></MainLayout>} />
        <Route path="/shree-banke-bihari-bhojnalay" element={<MainLayout><BhojnalayPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
