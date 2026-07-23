import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import LogoCloud  from './components/LogoCloud';
import Services   from './components/Services';
import HowItWorks from './components/HowItWorks';
import CTA        from './components/CTA';
import Footer     from './components/Footer';

export default function App() {
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
