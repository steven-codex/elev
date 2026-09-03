import { useState } from 'react';
import NoticeBanner from './components/NoticeBanner';
import Navbar from './components/Navbar';
import MultiProductHero from './components/MultiProductHero';
import LogoTicker from './components/LogoTicker';
import TimelineFeatureDeck from './components/TimelineFeatureDeck';
import StickyAccordionScheduling from './components/StickyAccordionScheduling';
import MeetCallieSection from './components/MeetCallieSection';
import NotetakerSection from './components/NotetakerSection';
import PaymentsSection from './components/PaymentsSection';
import GooeyElevShowcase from './components/GooeyElevShowcase';
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
      {/* Global SVG Gooey Filter Definitions */}
      <GooeySvgDefs />

      {/* 1. Top Announcement Notice Banner */}
      <NoticeBanner onOpenDemo={handleOpenDemo} />

      {/* 2. Primary Navigation Header */}
      <Navbar onOpenDemo={handleOpenDemo} onOpenAuth={handleOpenAuth} />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* 3. Hero Section with 4-Product Squircle Stage (Scheduling, Callie, Notetaker, Payments) */}
        <MultiProductHero onOpenAuth={handleOpenAuth} onOpenDemo={handleOpenDemo} />

        {/* 4. Enterprise Social Proof Logo Ticker */}
        <LogoTicker />

        {/* 5. Timeline Feature Deck: "Built for people whose work runs on meetings" (Book, Prep, Capture, Follow up) */}
        <TimelineFeatureDeck onOpenAuth={handleOpenAuth} />

        {/* 6. Sticky Switchback: "A better way to book your meetings" (6 Core Powers) */}
        <StickyAccordionScheduling onOpenDemo={handleOpenDemo} />

        {/* 7. Deep Dive: "Meet Callie, your AI assistant" */}
        <MeetCallieSection onOpenDemo={handleOpenDemo} />

        {/* 8. Deep Dive: "Actionable recaps for every meeting" (Notetaker) */}
        <NotetakerSection onOpenDemo={handleOpenDemo} />

        {/* 9. Deep Dive: "Flexible payment options that fit your business" (Payments) */}
        <PaymentsSection onOpenAuth={handleOpenAuth} />

        {/* 10. Interactive Gooey Intelligence Showcase: Liquid Metaball Workflow Fusion */}
        <GooeyElevShowcase onOpenDemo={handleOpenDemo} onOpenAuth={handleOpenAuth} />

        {/* 11. Customer Stories & Verified Metric Proof: "Real customers. Real results." */}
        <CustomerStoriesCarousel />

        {/* 12. Integrations Ecosystem (150+ integrations, Google & Microsoft Suite Cards) */}
        <IntegrationsSection onOpenDemo={handleOpenDemo} />

        {/* 13. Interactive Team Productivity & ROI Calculator */}
        <RoiCalculator onOpenAuth={handleOpenAuth} />

        {/* 14. Transparent Pricing Matrix */}
        <PricingSection onOpenAuth={handleOpenAuth} onOpenDemo={handleOpenDemo} />

        {/* 15. Expandable FAQ Accordion */}
        <FaqSection />

        {/* 16. Bottom Conversion Marquee Panel: "From the first meeting to the follow-up" */}
        <ConversionMarquee onOpenAuth={handleOpenAuth} />
      </main>

      {/* 17. Luxury Midnight Global Footer: "Make space for what matters." */}
      <Footer />

      {/* Floating Interactive elev Gooey Action Dock */}
      <GooeyElevDock onOpenDemo={handleOpenDemo} onOpenAuth={handleOpenAuth} />

      {/* Interactive Modals */}
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
