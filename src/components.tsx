import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode
} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  cameraOptions,
  faqs,
  footerLinks,
  navLinks,
  processSteps,
  reasons,
  serviceCapabilities,
  site,
  trustBadges,
  type QuotePrefill,
  type ServiceCapability,
  type ServiceIconKind,
  type ServiceItem
} from "./siteData";

const quoteDefaults = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  dashCamModel: "",
  installationType: "Front Dash Cam Install - Cigarette Lighter Socket - Starting at $149",
  hasDashcam: "Yes",
  preferredInstallation: "Mobile installation",
  preferredDate: "",
  notes: ""
};

type QuoteFormState = typeof quoteDefaults;

type QuoteModalContextValue = {
  openQuote: (prefill?: QuotePrefill) => void;
  closeQuote: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function PageShell({
  children,
  title,
  description,
  keywords
}: {
  children: ReactNode;
  title: string;
  description: string;
  keywords: string;
}) {
  usePageMetadata({ title, description, keywords });
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [prefill, setPrefill] = useState<QuotePrefill | undefined>(undefined);

  const contextValue = {
    openQuote: (nextPrefill?: QuotePrefill) => {
      setPrefill(nextPrefill);
      setIsQuoteOpen(true);
    },
    closeQuote: () => setIsQuoteOpen(false)
  };

  return (
    <QuoteModalContext.Provider value={contextValue}>
      <div className="min-h-screen bg-obsidian text-white">
        <div className="fixed inset-0 -z-10 bg-hero-radial" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%,rgba(185,144,45,0.04)_100%)]" />
        <Header />
        <main>{children}</main>
        <Footer />
        <QuoteModal isOpen={isQuoteOpen} prefill={prefill} onClose={() => setIsQuoteOpen(false)} />
      </div>
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within PageShell");
  }
  return context;
}

export function QuoteButton({
  className,
  prefill,
  children = "Get Quote"
}: {
  className?: string;
  prefill?: QuotePrefill;
  children?: ReactNode;
}) {
  const { openQuote } = useQuoteModal();

  return (
    <button type="button" className={className ?? "button-primary"} onClick={() => openQuote(prefill)}>
      {children}
    </button>
  );
}

function usePageMetadata({
  title,
  description,
  keywords
}: {
  title: string;
  description: string;
  keywords: string;
}) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const canonicalUrl = location.pathname === "/" ? site.websiteUrl : `${site.websiteUrl}${location.pathname}`;
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", `${site.websiteUrl}/images/og-dashcam-experts.png`);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, keywords, location.pathname, title]);
}

function setMetaTag(attribute: "name" | "property", value: string, content: string) {
  let element = document.querySelector(`meta[${attribute}='${value}']`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-black/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8 lg:py-4">
        <Link to="/" className="min-w-0 flex items-center gap-2.5 text-sm uppercase tracking-[0.24em] text-gold-300 sm:gap-3 sm:tracking-[0.35em]">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/50 bg-white/5 text-base sm:h-10 sm:w-10 sm:text-lg">
            DE
          </span>
          <span className="truncate text-[11px] sm:text-sm">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
          {navLinks.map((item) =>
            item.href.includes("#") ? (
              <a key={item.href} href={item.href} className="transition hover:text-gold-300">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} to={item.href} className="transition hover:text-gold-300">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex">
          <QuoteButton className="button-primary">Get Quote</QuoteButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-400/30 bg-gold-500/10 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 transition hover:border-gold-300/50 hover:text-gold-200 sm:px-4"
            onClick={() => openQuote()}
          >
            Get Quote
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 px-3 text-white"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex h-4 w-4 flex-col justify-between">
              <span className="h-0.5 rounded-full bg-current" />
              <span className="h-0.5 rounded-full bg-current" />
              <span className="h-0.5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) =>
              item.href.includes("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-1 py-2 text-sm text-white/85 transition hover:text-gold-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-2xl px-1 py-2 text-sm text-white/85 transition hover:text-gold-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              type="button"
              className="button-primary w-full text-center"
              onClick={() => {
                setMenuOpen(false);
                openQuote();
              }}
            >
              Get Quote
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/8 px-5 py-7 lg:px-8 lg:py-8">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-gold-300 sm:tracking-[0.3em]">{site.name}</p>
          <p className="mt-2 text-sm text-white/60">Professional dash cam installation</p>
          <p className="mt-1 text-sm text-white/60">{site.serviceArea}</p>
          <p className="mt-2 break-words text-sm text-white/60">
            Email:{" "}
            <a className="transition hover:text-gold-300" href={site.emailHref}>
              {site.emailDisplay}
            </a>
          </p>
          <p className="mt-2 break-words text-sm text-white/60">
            <a className="transition hover:text-gold-300" href={site.websiteUrl}>
              {site.websiteLabel}
            </a>
          </p>
          <p className="mt-3 text-sm text-white/60">
            Website created by{" "}
            <a className="text-gold-300 transition hover:text-gold-400" href={site.creatorUrl} target="_blank" rel="noreferrer">
              {site.creatorLabel}
            </a>
            .
          </p>
        </div>
        <div className="grid gap-x-5 gap-y-3 text-sm text-white/70 sm:grid-cols-2">
          {footerLinks.map((link) => (
            <Link key={link.href} to={link.href} className="break-words transition hover:text-gold-300">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-gold-300 sm:text-sm sm:tracking-[0.35em]">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{description}</p>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-white/8 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2.5 px-5 py-3 sm:gap-3 sm:py-4 lg:grid-cols-4 lg:px-8">
        {trustBadges.map((badge) => (
          <div
            key={badge}
            className="flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center text-[11px] uppercase tracking-[0.14em] text-white/78 sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.18em]"
          >
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesGrid({
  items,
  showBenefits = false,
  showQuoteButton = false
}: {
  items: ServiceItem[];
  showBenefits?: boolean;
  showQuoteButton?: boolean;
}) {
  const gridClass = items.length === 2 ? "mt-7 grid gap-4 md:grid-cols-2" : "mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={gridClass}>
      {items.map((service) => (
        <article key={service.title} className="glass-card flex h-full flex-col p-4 sm:p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-300 sm:mb-4 sm:h-11 sm:w-11">
            <ServiceIcon kind={service.icon} />
          </div>
          <h3 className="text-base font-medium text-white sm:text-lg">{service.title}</h3>
          {service.shortLabel ? <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/55">{service.shortLabel}</p> : null}
          <p className="mt-3 text-2xl font-semibold leading-none text-gold-300 sm:text-[1.75rem]">{service.startingAt}</p>
          <p className="mt-2 text-sm leading-6 text-white/68 sm:leading-7">{service.description}</p>
          {showBenefits && service.benefits.length > 0 ? (
            <div className="mt-4 space-y-2">
              {service.benefits.map((benefit) => (
                <p key={benefit} className="flex items-start gap-3 text-sm text-white/72">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gold-400" />
                  <span>{benefit}</span>
                </p>
              ))}
            </div>
          ) : null}
          {showQuoteButton ? <QuoteButton className="mt-5 text-sm text-gold-300">Get Quote</QuoteButton> : null}
        </article>
      ))}
    </div>
  );
}

export function PricingDisclaimer() {
  return (
    <p className="mt-5 max-w-4xl text-sm leading-6 text-white/60 sm:leading-7">
      Prices shown are starting labor rates. Final pricing may vary depending on vehicle type, dash cam model, wiring complexity, installation location, and requested add-ons. Dash cam hardware, hardwire kit, memory card, adapters, and extra parts are not included unless confirmed before booking.
    </p>
  );
}

export function ServiceCapabilitiesSection() {
  return (
    <div className="mt-8">
      <SectionHeading
        eyebrow="Also Available"
        title="Additional Installation Services"
        description="Additional services may be added to your installation and priced during your quote based on vehicle type, camera model, wiring complexity, and requested setup."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {serviceCapabilities.map((capability) => (
          <ServiceCapabilityCard key={capability.title} capability={capability} />
        ))}
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-6 text-white/60 sm:leading-7">
        These services are not always included in the base package price. Final pricing is confirmed before booking.
      </p>
    </div>
  );
}

export function CameraOptionsSection() {
  const { openQuote } = useQuoteModal();

  return (
    <section id="cameras" className="mx-auto max-w-7xl px-5 py-9 lg:px-8 lg:py-10">
      <SectionHeading
        eyebrow="Camera Guide"
        title="Choose the Right Dash Cam Setup"
        description="A compact guide to the camera style that fits your vehicle, parking needs, and budget."
      />
      <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cameraOptions.map((option) => (
          <article key={option.title} className="glass-card p-4 sm:p-5">
            <h3 className="text-base font-medium text-white sm:text-lg">{option.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/72">{option.audience}</p>
            <p className="mt-1.5 text-sm leading-6 text-white/58">{option.summary}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-4 rounded-[1.75rem] border border-gold-500/20 bg-gold-500/8 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="max-w-2xl text-sm leading-6 text-white/72 sm:leading-7">
          Not sure which setup to choose? Send us your vehicle details and we'll recommend the right installation style.
        </p>
        <button
          type="button"
          className="button-primary w-full sm:w-auto"
          onClick={() =>
            openQuote({
              installationType: "Not Sure Yet",
              hasDashcam: "Need recommendation",
              notes: "I would like a recommendation for the right dash cam installation style."
            })
          }
        >
          Get Recommendation
        </button>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-9 lg:px-8 lg:py-10">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="A cleaner result with less guesswork"
        description="A short look at what matters most when you want a premium install without a cluttered interior."
      />
      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {reasons.map((reason, index) => (
          <div key={reason} className="glass-card p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-300">0{index + 1}</p>
            <p className="mt-3 text-sm leading-6 text-white sm:text-base">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-9 lg:px-8 lg:py-10">
      <SectionHeading
        eyebrow="Simple Process"
        title="Vehicle details to drive protected"
        description="A compact 4-step path from quote request to finished installation."
      />
      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step, index) => (
          <div key={step} className="glass-card flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-sm font-semibold text-gold-300">
              0{index + 1}
            </div>
            <p className="text-sm text-white/80">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EstimateSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-9 lg:px-8 lg:py-10">
      <div className="glass-card overflow-hidden p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-300 sm:text-sm sm:tracking-[0.35em]">Final Quote CTA</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Ready for a clean dash cam install?</h2>
          </div>
          <QuoteButton className="button-primary w-full sm:w-auto">Get Quote</QuoteButton>
        </div>
      </div>
    </section>
  );
}

export function ContactCard() {
  return (
    <div className="glass-card p-5 sm:p-7">
      <SectionHeading eyebrow="Contact" title={site.name} description={`Premium dash cam installation for ${site.serviceArea}.`} />
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2 text-sm leading-6 text-white/76 sm:text-base sm:leading-7">
          <p className="break-words">
            Email:{" "}
            <a className="text-gold-300 transition hover:text-gold-400" href={site.emailHref}>
              {site.emailDisplay}
            </a>
          </p>
          <p className="break-words">
            Website:{" "}
            <a className="text-gold-300 transition hover:text-gold-400" href={site.websiteUrl}>
              {site.websiteLabel}
            </a>
          </p>
          <p>Serving: {site.serviceArea}</p>
        </div>
        <QuoteButton className="button-primary w-full sm:w-auto">Get Quote</QuoteButton>
      </div>
    </div>
  );
}

export function FaqList() {
  return (
    <div className="mt-7 grid gap-4">
      {faqs.map((faq) => (
        <details key={faq.question} className="glass-card group p-4 sm:p-5">
          <summary className="cursor-pointer list-none py-1 text-base font-medium text-white marker:hidden sm:text-lg">
            <div className="flex items-center justify-between gap-4">
              <span>{faq.question}</span>
              <span className="text-gold-300 transition group-open:rotate-45">+</span>
            </div>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/72 sm:leading-7">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-7 pt-12 lg:px-8 lg:pb-10 lg:pt-18">
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.28em] text-gold-300/90 sm:text-sm sm:tracking-[0.4em]">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-7">{description}</p>
        {actions ? <div className="mt-6 flex flex-col gap-4 sm:flex-row">{actions}</div> : null}
      </div>
    </section>
  );
}

export function LegalSectionList({
  sections
}: {
  sections: Array<{ title: string; body: ReactNode }>;
}) {
  return (
    <div className="mt-8 grid gap-5">
      {sections.map((section) => (
        <section key={section.title} className="glass-card p-5 sm:p-8">
          <h2 className="text-lg font-medium text-white sm:text-xl">{section.title}</h2>
          <div className="mt-4 text-sm leading-7 text-white/72 sm:leading-8">{section.body}</div>
        </section>
      ))}
    </div>
  );
}

export function LegalContactNote() {
  return (
    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm text-white/68">
      Contact:{" "}
      <a className="text-gold-300 transition hover:text-gold-400" href={site.emailHref}>
        {site.emailDisplay}
      </a>
      {" | "}
      <a className="text-gold-300 transition hover:text-gold-400" href={site.websiteUrl}>
        {site.websiteLabel}
      </a>
    </div>
  );
}

export function HomeHeroVisual() {
  return (
    <div className="relative mt-1 flex items-center justify-center sm:mt-2">
      <div className="absolute inset-auto top-3 h-28 w-28 rounded-full bg-gold-500/10 blur-3xl sm:top-4 sm:h-32 sm:w-32" />
      <div className="w-full max-w-[26rem]">
        <div className="glass-card border-gold-500/10 p-3.5 shadow-glow sm:p-[18px]">
          <div className="grid gap-3 sm:grid-cols-1">
            <HeroInfoCard
              title="Factory-Style Wiring"
              body="Trim-aware routing designed to keep your interior looking clean."
              icon={<HeroChipIcon kind="route" />}
            />
            <HeroInfoCard
              title="Front + Rear Ready"
              body="Clean installation for single or dual-camera setups."
              icon={<HeroChipIcon kind="dual" />}
            />
            <HeroInfoCard
              title="Parking Mode Support"
              body="Hardwire-ready setup for compatible cameras and parked-car coverage."
              icon={<HeroChipIcon kind="parking" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroInfoCard({
  title,
  body,
  icon
}: {
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div className="min-h-[96px] rounded-[1.45rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015)_45%,rgba(185,144,45,0.04)_100%)] p-3.5 sm:min-h-[108px] sm:p-4">
      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-300 sm:h-11 sm:w-11">
          {icon}
        </div>
        <div className="flex min-h-[44px] flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300">{title}</p>
          <p className="mt-2 text-sm leading-5 text-white/68 sm:leading-6">{body}</p>
        </div>
      </div>
    </div>
  );
}

function HeroChipIcon({ kind }: { kind: "route" | "dual" | "parking" }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    viewBox: "0 0 24 24"
  };

  switch (kind) {
    case "route":
      return (
        <svg {...commonProps}>
          <path d="M5 18a2 2 0 1 0 0-4h8a3 3 0 1 0 0-6h6" />
          <circle cx="19" cy="8" r="2" />
        </svg>
      );
    case "dual":
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="7" height="10" rx="2" />
          <rect x="14" y="7" width="7" height="10" rx="2" />
          <path d="M10 12h4" />
        </svg>
      );
    case "parking":
      return (
        <svg {...commonProps}>
          <path d="M7 20V5h6a4 4 0 0 1 0 8H7" />
        </svg>
      );
  }
}

function QuoteModal({
  isOpen,
  prefill,
  onClose
}: {
  isOpen: boolean;
  prefill?: QuotePrefill;
  onClose: () => void;
}) {
  const [form, setForm] = useState<QuoteFormState>(quoteDefaults);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setForm({
        ...quoteDefaults,
        installationType: prefill?.installationType ?? quoteDefaults.installationType,
        hasDashcam: prefill?.hasDashcam ?? quoteDefaults.hasDashcam,
        notes: prefill?.notes ?? quoteDefaults.notes
      });
      setErrors([]);
    }
  }, [isOpen, prefill]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const onChange =
    (field: keyof QuoteFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = [
      !form.fullName.trim() ? "Full Name is required." : "",
      !form.phoneNumber.trim() ? "Phone Number is required." : "",
      !form.vehicleYear.trim() ? "Vehicle Year is required." : "",
      !form.vehicleMake.trim() ? "Vehicle Make is required." : "",
      !form.vehicleModel.trim() ? "Vehicle Model is required." : ""
    ].filter(Boolean);

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }

    const lines = [
      "Hi, I need a dash cam installation quote.",
      "",
      `Full Name: ${form.fullName}`,
      `Phone Number: ${form.phoneNumber}`,
      `Email Address: ${form.emailAddress || "Not provided"}`,
      `Vehicle Year: ${form.vehicleYear}`,
      `Vehicle Make: ${form.vehicleMake}`,
      `Vehicle Model: ${form.vehicleModel}`,
      `Dash Cam Brand / Model: ${form.dashCamModel || "Not provided"}`,
      `Installation Type: ${form.installationType}`,
      `Already Have Dash Cam: ${form.hasDashcam}`,
      `Preferred Installation: ${form.preferredInstallation}`,
      `Preferred Date: ${form.preferredDate || "Not provided"}`,
      `Notes / Questions: ${form.notes || "None"}`
    ];

    const url = `${site.whatsappBase}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
      <div className="glass-card max-h-[calc(100vh-0.75rem)] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] p-4 sm:max-h-[90vh] sm:p-8">
        <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-5 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0b0b0c]/95 px-4 py-4 backdrop-blur-sm sm:static sm:m-0 sm:mb-0 sm:border-b-0 sm:bg-transparent sm:p-0">
          <div className="pr-2">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-300 sm:text-sm sm:tracking-[0.35em]">Get Quote</p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:mt-3 sm:text-2xl">Get a Dash Cam Installation Quote</h2>
            <p className="mt-2 text-sm leading-6 text-white/70 sm:mt-3 sm:leading-7">
              Fill out the details below and we will open WhatsApp with a clean quote request message.
            </p>
          </div>
          <button
            type="button"
            className="min-h-11 shrink-0 rounded-full border border-white/10 px-3 py-2 text-white/70 transition hover:text-gold-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {errors.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-100">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        <form className="mt-1 grid gap-4 sm:mt-6 sm:grid-cols-2" onSubmit={onSubmit}>
          <Field label="Full Name" required>
            <input className="input-field" value={form.fullName} onChange={onChange("fullName")} />
          </Field>
          <Field label="Phone Number" required>
            <input className="input-field" value={form.phoneNumber} onChange={onChange("phoneNumber")} />
          </Field>
          <Field label="Email Address">
            <input className="input-field" type="email" value={form.emailAddress} onChange={onChange("emailAddress")} />
          </Field>
          <Field label="Vehicle Year" required>
            <input className="input-field" value={form.vehicleYear} onChange={onChange("vehicleYear")} />
          </Field>
          <Field label="Vehicle Make" required>
            <input className="input-field" value={form.vehicleMake} onChange={onChange("vehicleMake")} />
          </Field>
          <Field label="Vehicle Model" required>
            <input className="input-field" value={form.vehicleModel} onChange={onChange("vehicleModel")} />
          </Field>
          <Field label="Dash Cam Brand / Model">
            <input className="input-field" value={form.dashCamModel} onChange={onChange("dashCamModel")} />
          </Field>
          <Field label="Installation Type">
            <select className="input-field" value={form.installationType} onChange={onChange("installationType")}>
              <option>Front Dash Cam Install — Cigarette Lighter Socket — Starting at $149</option>
              <option>Front + Rear Install + Hardwire + Parking Mode — Starting at $200</option>
              <option>Not Sure Yet</option>
            </select>
          </Field>
          <Field label="Do you already have the dash cam?">
            <select className="input-field" value={form.hasDashcam} onChange={onChange("hasDashcam")}>
              <option>Yes</option>
              <option>No</option>
              <option>Need recommendation</option>
            </select>
          </Field>
          <Field label="Preferred Installation">
            <select className="input-field" value={form.preferredInstallation} onChange={onChange("preferredInstallation")}>
              <option>Mobile installation</option>
              <option>I can come to you</option>
              <option>Not sure</option>
            </select>
          </Field>
          <Field label="Preferred Date">
            <input className="input-field" type="date" value={form.preferredDate} onChange={onChange("preferredDate")} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes / Questions">
              <textarea className="input-field min-h-28 resize-y" value={form.notes} onChange={onChange("notes")} />
            </Field>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65 sm:col-span-2">
            Email us at{" "}
            <a className="text-gold-300 transition hover:text-gold-400" href={site.emailHref}>
              {site.emailDisplay}
            </a>
            {" if you prefer email, or use "}
            <a className="text-gold-300 transition hover:text-gold-400" href={site.smsHref}>
              SMS
            </a>
            {" as a fallback after sending your quote request on WhatsApp."}
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row">
            <button type="submit" className="button-primary w-full sm:w-auto">
              Send by WhatsApp
            </button>
            <a className="button-secondary w-full sm:w-auto" href={site.smsHref}>
              Send by SMS
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/78">
      <span>
        {label}
        {required ? <span className="text-gold-300"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function ServiceCapabilityCard({ capability }: { capability: ServiceCapability }) {
  return (
    <article className="glass-card p-4 sm:p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-300 sm:h-11 sm:w-11">
        <ServiceIcon kind={capability.icon} />
      </div>
      <h3 className="text-base font-medium text-white sm:text-lg">{capability.title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/68 sm:leading-7">{capability.description}</p>
    </article>
  );
}

function ServiceIcon({ kind }: { kind: ServiceIconKind }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    viewBox: "0 0 24 24"
  };

  switch (kind) {
    case "front":
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="12" rx="3" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "dual":
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="7" height="10" rx="2" />
          <rect x="14" y="7" width="7" height="10" rx="2" />
          <path d="M10 12h4" />
        </svg>
      );
    case "power":
      return (
        <svg {...commonProps}>
          <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" />
        </svg>
      );
    case "parking":
      return (
        <svg {...commonProps}>
          <path d="M7 20V5h6a4 4 0 0 1 0 8H7" />
        </svg>
      );
    case "route":
      return (
        <svg {...commonProps}>
          <path d="M5 18a2 2 0 1 0 0-4h8a3 3 0 1 0 0-6h6" />
          <circle cx="19" cy="8" r="2" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...commonProps}>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M11 6h2" />
          <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "upgrade":
      return (
        <svg {...commonProps}>
          <path d="M12 3v6m0 0 3-3m-3 3L9 6" />
          <rect x="4" y="11" width="16" height="10" rx="3" />
        </svg>
      );
    case "cleanup":
      return (
        <svg {...commonProps}>
          <path d="m4 15 4-4 3 3 5-6 4 4" />
          <path d="M4 19h16" />
        </svg>
      );
  }
}
