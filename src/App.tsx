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
import ConversionMarquee from './components/ConversionMarquee';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import AuthModal from './components/AuthModal';
import GooeySvgDefs from './components/GooeySvgDefs';
import GooeyElevDock from './components/GooeyElevDock';

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-950 relative">
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

        {/* SECTION 07: Final CTA Banner ("Ready to elevate your meetings?") */}
        <ConversionMarquee onOpenAuth={handleOpenAuth} />
      </main>

      {/* Global Footer & Dock */}
      <Footer />
      <GooeyElevDock onOpenDemo={handleOpenDemo} onOpenAuth={handleOpenAuth} />

      {/* Modals */}
      <DemoModal isOpen={demoModalOpen} onClose={handleCloseDemo} />
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={handleCloseAuth}
        onSwitchMode={handleSwitchAuthMode}
      />
    </div>
  );
}
