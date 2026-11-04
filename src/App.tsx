import Navbar from './components/Navbar';
import MultiProductHero from './components/MultiProductHero';
import LogoTicker from './components/LogoTicker';
import TimelineFeatureDeck from './components/TimelineFeatureDeck';
import CustomerStoriesCarousel from './components/CustomerStoriesCarousel';
import IntegrationsSection from './components/IntegrationsSection';
import RoiCalculator from './components/RoiCalculator';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import ConnectedAppShellShowcase from './components/ConnectedAppShellShowcase';
import Footer from './components/Footer';
import GooeySvgDefs from './components/GooeySvgDefs';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-950 relative overflow-x-clip">
        {/* Global SVG Filter Definitions */}
        <GooeySvgDefs />

        {/* Primary Navigation Header */}
        <Navbar />

        {/* Section order: Hero, LogoTicker, Services, Case studies, Integrations, ROI, Engagement, FAQ, App shell + Footer */}
        <main className="flex-1">
          <MultiProductHero />

          {/* SECTION 02: Enterprise Social Proof & Logo Ticker */}
          <LogoTicker />

          {/* SECTION 03: Meeting Lifecycle Deck (01 Before, 02 During, 03 After, 04 Revenue) */}
          <TimelineFeatureDeck />

          {/* SECTION 03b: Case studies (#work) + interactive demos */}
          <CustomerStoriesCarousel />

          {/* SECTION 04: Integrations & Ecosystem (150+ Native Integrations & Tech Stack) */}
          <IntegrationsSection />

          {/* SECTION 04b: ROI estimator (#roi) */}
          <RoiCalculator />

          {/* SECTION 05: Engagement (#engagement) */}
          <PricingSection />

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
            <ConnectedAppShellShowcase />

            {/* Global Footer */}
            <Footer />
          </div>
        </main>

      </div>
  );
}
