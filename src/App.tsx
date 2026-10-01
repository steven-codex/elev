import { useState } from 'react';
import Navbar from './components/Navbar';
import MultiProductHero from './components/MultiProductHero';
import LogoTicker from './components/LogoTicker';
import TimelineFeatureDeck from './components/TimelineFeatureDeck';
import StickyAccordionScheduling from './components/StickyAccordionScheduling';
import MeetVelieSection from './components/MeetCallieSection';
import NotetakerSection from './components/NotetakerSection';
import PaymentsSection from './components/PaymentsSection';
import GooeyElevShowcase from './components/GooeyElevShowcase';
import StatsBento from './components/StatsBento';
import CustomerStoriesCarousel from './components/CustomerStoriesCarousel';
import IntegrationsSection from './components/IntegrationsSection';
import RoiCalculator from './components/RoiCalculator';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import ConnectedAppShellShowcase from './components/ConnectedAppShellShowcase';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import AuthModal from './components/AuthModal';
import GooeySvgDefs from './components/GooeySvgDefs';
import { SmoothScrollProvider } from './motion';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });

  const handleOpenDemo = () => setDemoModalOpen(true);
  const handleCloseDemo = () => setDemoModalOpen(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSwitchAuthMode = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-950 relative overflow-x-clip">
        {/* Global SVG Filter Definitions */}
        <GooeySvgDefs />

        {/* Primary Navigation Header */}
        <Navbar onOpenDemo={handleOpenDemo} onOpenAuth={handleOpenAuth} />

        {/* 
          ========================================================================
          EXACT 7 MASTER SECTIONS (aligned with elev-ai-landing-page-master-spec.md)
          ========================================================================
        */}
        <main className="flex-1">
          {/* SECTION 01: Hero Section (Conversion Form, Trust Metrics & Product UI) */}
          <MultiProductHero onOpenAuth={handleOpenAuth} onOpenDemo={handleOpenDemo} />

          {/* SECTION 02: Enterprise Social Proof & Logo Ticker */}
          <LogoTicker />

          {/* SECTION 03: Meeting Lifecycle Deck (01 Before, 02 During, 03 After, 04 Revenue) */}
          <TimelineFeatureDeck onOpenAuth={handleOpenAuth} />

          {/* SECTION 04: Integrations & Ecosystem (150+ Native Integrations & Tech Stack) */}
          <IntegrationsSection onOpenDemo={handleOpenDemo} />

          {/* SECTION 05: Transparent 4-Plan Pricing Matrix */}
          <PricingSection onOpenAuth={handleOpenAuth} onOpenDemo={handleOpenDemo} />

          {/* SECTION 06: Expandable FAQ Accordion */}
          <FaqSection />

          {/* SECTION 07 & FOOTER: Connected App Shell & Footer Unified Fluid Horizon */}
          <div className="relative w-full overflow-hidden bg-white">
            {/* Massive Background Fluid Wave Asset (Bleeding from bottom of Footer upwards into App Shell) */}
            <div 
              className="absolute -bottom-16 sm:-bottom-24 lg:-bottom-32 left-1/2 -translate-x-1/2 w-full max-w-[2600px] pointer-events-none z-0 overflow-visible flex flex-col items-center select-none"
              aria-hidden="true"
            >
              {/* Atmospheric Blue Glow Clouds matching Header Frame 11 */}
              <div 
                className="absolute bottom-16 sm:bottom-28 lg:bottom-40 -left-16 sm:-left-28 w-[600px] sm:w-[850px] h-[550px] sm:h-[750px] rounded-full bg-blue-400/22 blur-[130px] pointer-events-none" 
              />
              <div 
                className="absolute bottom-24 sm:bottom-36 lg:bottom-52 -right-16 sm:-right-28 w-[650px] sm:w-[900px] h-[600px] sm:h-[800px] rounded-full bg-sky-300/20 blur-[140px] pointer-events-none" 
              />
              <div 
                className="absolute bottom-[360px] sm:bottom-[440px] lg:bottom-[500px] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[500px] sm:h-[700px] rounded-full bg-sky-200/22 blur-[150px] pointer-events-none" 
              />

              {/* Full-Scale Fluid Wave Asset (From Header) */}
              <img
                src="/hero-bg-fluid.png"
                alt=""
                className="relative z-0 w-[1400px] sm:w-[1850px] lg:w-[2250px] xl:w-[2500px] max-w-none h-auto object-contain select-none pointer-events-none mx-auto"
              />
            </div>

            {/* SECTION 07: Connected App Shell & Feature Ecosystem */}
            <ConnectedAppShellShowcase onOpenAuth={handleOpenAuth} onOpenDemo={handleOpenDemo} />

            {/* Global Footer */}
            <Footer />
          </div>
        </main>

        {/* Modals */}
        <DemoModal isOpen={demoModalOpen} onClose={handleCloseDemo} />
        <AuthModal
          isOpen={authModal.isOpen}
          mode={authModal.mode}
          onClose={handleCloseAuth}
          onSwitchMode={handleSwitchAuthMode}
        />
      </div>
    </SmoothScrollProvider>
  );
}
