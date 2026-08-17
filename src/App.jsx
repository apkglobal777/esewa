import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import LogoCloud       from './components/LogoCloud';
import Services        from './components/Services';
import HowItWorks      from './components/HowItWorks';
import CTA             from './components/CTA';
import Footer          from './components/Footer';
import Login           from './pages/Login';
import ClientRegister  from './pages/ClientRegister';
import LawyerOnboarding from './pages/LawyerOnboarding';
import LawyerStatus    from './pages/LawyerStatus';
import NotFound        from './pages/NotFound';

/* ── Panel Pages & Layout ── */
import LawyerLayout    from './components/LawyerLayout';
import LawyerDashboard from './pages/LawyerDashboard';
import LawyerCases     from './pages/LawyerCases';
import LawyerDocuments from './pages/LawyerDocuments';
import LawyerBillings  from './pages/LawyerBillings';
import LawyerSettings  from './pages/LawyerSettings';
import LawyerMessages  from './pages/LawyerMessages';

import { LawyerProvider } from './context/LawyerContext';

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
    <LawyerProvider>
      <Routes>
        <Route path="/"                    element={<LandingPage />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/client/register"     element={<ClientRegister />} />
        <Route path="/lawyer/onboarding"   element={<LawyerOnboarding />} />
        <Route path="/lawyer/status"       element={<LawyerStatus />} />

        {/* ── Lawyer Panel Workspace Layout ── */}
        <Route path="/lawyer"              element={<LawyerLayout />}>
          <Route path="dashboard"          element={<LawyerDashboard />} />
          <Route path="cases"              element={<LawyerCases />} />
          <Route path="documents"          element={<LawyerDocuments />} />
          <Route path="billings"           element={<LawyerBillings />} />
          <Route path="settings"           element={<LawyerSettings />} />
          <Route path="messages"           element={<LawyerMessages />} />
        </Route>

        <Route path="*"                    element={<NotFound />} />
      </Routes>
    </LawyerProvider>
  );
}


