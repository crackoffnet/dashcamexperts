import {
  CameraOptionsSection,
  ContactCard,
  EstimateSection,
  FaqList,
  HomeHeroVisual,
  LegalContactNote,
  LegalSectionList,
  PageHero,
  PageShell,
  PricingDisclaimer,
  ProcessSection,
  QuoteButton,
  SectionHeading,
  ServicesGrid,
  TrustBar,
  WhyUsSection
} from "./components";
import { compactServices, fullServices, policies, site } from "./siteData";

const sharedKeywords =
  "dash cam installation Los Angeles, dash camera installation LA, hardwire dash cam install, parking mode dash cam setup, front and rear dash cam installation, hidden wire dash cam install, mobile dash cam installation";

export function HomePage() {
  return (
    <PageShell
      title="Dashcam Experts | Dash Cam Installation in Los Angeles"
      description="Premium dash cam installation in LA & nearby areas. Hidden wires, front and rear camera installs, hardwire setup, parking mode, and mobile installation."
      keywords={sharedKeywords}
    >
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-10 lg:pt-14">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-gold-300/90">Los Angeles Premium Install Service</p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Dash Cam Installation in Los Angeles
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-lg">
            Clean factory-style installation, discreet wire routing, and premium fitment for drivers who want protection without visual clutter.
          </p>
          <div className="mt-5">
            <QuoteButton className="button-primary">Get Quote</QuoteButton>
          </div>
        </div>

        <HomeHeroVisual />
      </section>

      <TrustBar />

      <section className="mx-auto max-w-7xl px-5 py-9 lg:px-8">
        <SectionHeading
          eyebrow="Services + Pricing"
          title="Installation options with clear starting labor rates"
          description="Choose the service that fits your vehicle now, then use the quote form for a more exact review."
        />
        <ServicesGrid items={compactServices} />
        <PricingDisclaimer />
        <div className="mt-6">
          <QuoteButton className="button-primary">Get Quote</QuoteButton>
        </div>
      </section>

      <CameraOptionsSection />
      <WhyUsSection />
      <ProcessSection />

      <section className="mx-auto max-w-7xl px-5 py-9 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Quick answers before you book"
          description="A short FAQ to help you move faster before sending your quote request."
        />
        <FaqList />
      </section>

      <EstimateSection />
    </PageShell>
  );
}

export function ServicesPage() {
  return (
    <PageShell
      title="Services | Dashcam Experts"
      description="Explore Dashcam Experts installation services including front camera installs, front and rear systems, hardwire setup, hidden wire cleanup, mobile installation, and camera upgrades."
      keywords={sharedKeywords}
    >
      <PageHero
        eyebrow="Services"
        title="Professional installation services with straightforward starting rates"
        description="Starting labor rates are shown below. Final pricing depends on the vehicle, camera model, installation type, and wiring complexity."
        actions={<QuoteButton className="button-primary">Get Quote</QuoteButton>}
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <ServicesGrid items={fullServices} showBenefits />
        <PricingDisclaimer />
      </section>
    </PageShell>
  );
}

export function FaqPage() {
  return (
    <PageShell
      title="FAQ | Dashcam Experts"
      description="Common questions about dash cam installation in Los Angeles, including hidden wire routing, front and rear camera installs, parking mode support, and mobile service."
      keywords={sharedKeywords}
    >
      <PageHero
        eyebrow="FAQ"
        title="Questions drivers ask before booking installation"
        description="These answers cover routing, compatibility, parking mode support, and what to expect before the appointment."
        actions={<QuoteButton className="button-primary">Get Quote</QuoteButton>}
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <FaqList />
      </section>
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell
      title="Contact | Dashcam Experts"
      description="Get a dash cam installation quote from Dashcam Experts in LA & nearby areas through the website quote form, email, or SMS fallback."
      keywords={sharedKeywords}
    >
      <PageHero
        eyebrow="Contact"
        title="Reach out for a dash cam installation quote"
        description="Use the quote form for the fastest path, or contact us by email if you prefer to start there."
        actions={<QuoteButton className="button-primary">Get Quote</QuoteButton>}
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <ContactCard />
      </section>
    </PageShell>
  );
}

type PolicyPageProps = {
  policyKey: keyof typeof policies;
};

function PolicyPage({ policyKey }: PolicyPageProps) {
  const policy = policies[policyKey];

  return (
    <PageShell
      title={`${policy.title} | Dashcam Experts`}
      description={policy.description}
      keywords={sharedKeywords}
    >
      <PageHero
        eyebrow="Legal"
        title={policy.title}
        description={`${policy.description} Website: ${site.websiteLabel}. Email: ${site.emailDisplay}.`}
      />
      <section className="mx-auto max-w-5xl px-5 pb-16 lg:px-8">
        <LegalSectionList sections={policy.sections} />
        <LegalContactNote />
      </section>
    </PageShell>
  );
}

export function PrivacyPolicyPage() {
  return <PolicyPage policyKey="privacy" />;
}

export function TermsPage() {
  return <PolicyPage policyKey="terms" />;
}

export function RefundPolicyPage() {
  return <PolicyPage policyKey="refund" />;
}

export function CookiePolicyPage() {
  return <PolicyPage policyKey="cookie" />;
}

export function DisclaimerPage() {
  return <PolicyPage policyKey="disclaimer" />;
}
