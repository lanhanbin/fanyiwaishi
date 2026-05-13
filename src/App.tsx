import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TranslationService from './pages/TranslationService';
import ForeignAffairs from './pages/ForeignAffairs';
import TiangongAcademy from './pages/TiangongAcademy';
import ResourceCenter from './pages/ResourceCenter';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/translation" element={<TranslationService />} />
              <Route path="/foreign-affairs" element={<ForeignAffairs />} />
              <Route path="/tiangong" element={<TiangongAcademy />} />
              <Route path="/resources" element={<ResourceCenter />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
