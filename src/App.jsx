import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import LogoCloud  from './components/LogoCloud';
import Services   from './components/Services';
import HowItWorks from './components/HowItWorks';
import CTA        from './components/CTA';
import Footer     from './components/Footer';
import Login      from './pages/Login';

/* ── Landing page layout ── */
function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Services />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"      element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
