import React from "react";
import {
  LogoIcon,
  GoogleCalendarIcon,
  ZoomIcon,
  StripeIcon,
  SalesforceIcon,
  SlackIcon,
  OpenAiIcon,
  ZapierIcon,
  HubSpotIcon,
  TeamsIcon
} from "./integrations-3-utils/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface IntegrationsSectionProps {
  onOpenExplorer?: () => void;
}

export default function IntegrationsSection3({ onOpenExplorer }: IntegrationsSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 sm:grid-cols-2 lg:gap-16">
          
          {/* Left Column: Radial Honeycomb Cluster */}
          <div className="relative mx-auto w-fit select-none">
            
            {/* Radial Gradient Backdrop Mask */}
            <div
              aria-hidden
              className="absolute -inset-6 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(248,250,252,0.95)_75%)] pointer-events-none"
            />

            {/* Row 1 */}
            <div className="mx-auto mb-3 flex w-fit justify-center gap-3">
              <IntegrationCard title="Google Calendar">
                <GoogleCalendarIcon />
              </IntegrationCard>
              <IntegrationCard title="Zoom">
                <ZoomIcon />
              </IntegrationCard>
              <IntegrationCard title="Slack">
                <SlackIcon />
              </IntegrationCard>
            </div>

            {/* Row 2: Featured Core Hub in Center */}
            <div className="mx-auto my-3 flex w-fit justify-center gap-3 items-center">
              <IntegrationCard title="Salesforce">
                <SalesforceIcon />
              </IntegrationCard>
              
              <IntegrationCard
                borderClassName="shadow-xl shadow-blue-500/10 border-blue-400/80 ring-4 ring-blue-50/90"
                className="bg-white/95 scale-110 z-20 shadow-lg"
                title="elev.ai Core Hub"
              >
                <LogoIcon />
              </IntegrationCard>
              
              <IntegrationCard title="Stripe">
                <StripeIcon />
              </IntegrationCard>
            </div>

            {/* Row 3 */}
            <div className="mx-auto mt-3 flex w-fit justify-center gap-3">
              <IntegrationCard title="OpenAI (ChatGPT)">
                <OpenAiIcon />
              </IntegrationCard>
              <IntegrationCard title="HubSpot">
                <HubSpotIcon />
              </IntegrationCard>
              <IntegrationCard title="Zapier">
                <ZapierIcon />
              </IntegrationCard>
            </div>

          </div>

          {/* Right Column: Hero Copy & CTA */}
          <div className="mx-auto max-w-lg space-y-6 text-center sm:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-normal tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NATIVE INTEGRATIONS ENGINE</span>
            </div>

            <h2 className="text-balance text-3xl font-normal text-[#0A0D14] md:text-4xl lg:text-[2.6rem] tracking-tight leading-[1.12]">
              Integrate with your favorite tools.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal text-pretty">
              elev.ai fits right into your existing stack and automates the busywork in between — syncing 150+ apps with zero latency.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={onOpenExplorer}
                className="rounded-full bg-[#0055FF] hover:bg-[#0047D6] text-white shadow-md shadow-blue-500/20 gap-2 cursor-pointer active:scale-[0.96]"
              >
                <span>Explore 150+ integrations</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  borderClassName,
  title
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  title?: string;
}) => {
  return (
    <div
      title={title}
      className={cn(
        "bg-white relative flex size-20 rounded-2xl border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:scale-108 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer",
        className
      )}
    >
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-2xl border border-slate-200/80 pointer-events-none transition-colors",
          borderClassName
        )}
      />
      <div className="relative z-20 m-auto flex items-center justify-center size-fit">
        {children}
      </div>
    </div>
  );
};
