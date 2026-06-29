import type { ReactNode } from "react";

export const site = {
  name: "Dashcam Experts",
  phoneDisplay: "(747) 247-0021",
  phoneHref: "tel:+17472470021",
  smsHref: "sms:+17472470021",
  emailDisplay: "info@dashcamexperts.xyz",
  emailHref: "mailto:info@dashcamexperts.xyz",
  whatsappBase: "https://wa.me/17472470021",
  websiteUrl: "https://www.dashcamexperts.xyz",
  websiteLabel: "www.dashcamexperts.xyz",
  websiteRootUrl: "https://dashcamexperts.xyz",
  serviceArea: "LA & nearby areas",
  creatorUrl: "https://www.gax-global.com/",
  creatorLabel: "GAX GLOBAL"
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Cameras", href: "/#cameras" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const footerLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Cancellation Policy", href: "/refund-cancellation-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" }
];

export type ServiceIconKind =
  | "front"
  | "dual"
  | "power"
  | "parking"
  | "route"
  | "mobile"
  | "upgrade"
  | "cleanup";

export type ServiceItem = {
  icon: ServiceIconKind;
  title: string;
  description: string;
  startingAt: string;
  benefits: string[];
};

export type CameraOption = {
  title: string;
  audience: string;
  summary: string;
};

export type QuotePrefill = {
  installationType?: string;
  hasDashcam?: string;
  notes?: string;
};

export const trustBadges = ["Hidden Wires", "Front + Rear", "Parking Mode", "Mobile Install"];

export const compactServices: ServiceItem[] = [
  {
    icon: "front",
    title: "Front Dash Cam Install",
    startingAt: "Starting at $99",
    description: "Clean front camera installation with hidden wire routing.",
    benefits: ["Balanced windshield fit", "Neat upper trim routing", "Built for everyday protection"]
  },
  {
    icon: "dual",
    title: "Front + Rear Install",
    startingAt: "Starting at $189",
    description: "Front and rear camera setup with clean cable routing through the vehicle.",
    benefits: ["Full driving coverage", "Discreet rear wire path", "Refined overall finish"]
  },
  {
    icon: "power",
    title: "Hardwire + Parking Mode",
    startingAt: "Starting at $149",
    description: "Hardwire kit installation and parking mode configuration for compatible dash cams.",
    benefits: ["Cleaner power source", "Prepared for parked recording", "Better feature support"]
  },
  {
    icon: "route",
    title: "Hidden Wire Cleanup",
    startingAt: "Starting at $79",
    description: "Clean up visible wires and improve the factory-style look of an existing setup.",
    benefits: ["No visible cable clutter", "Cleaner interior appearance", "Sharper final presentation"]
  },
  {
    icon: "mobile",
    title: "Mobile Installation",
    startingAt: "Starting at $49 travel fee",
    description: "Convenient installation at your location in LA & nearby areas.",
    benefits: ["Convenient scheduling", "Straightforward on-site service", "Premium mobile support"]
  },
  {
    icon: "upgrade",
    title: "Camera Replacement / Upgrade",
    startingAt: "Starting at $89",
    description: "Replace or upgrade an existing dash cam using a cleaner installation layout.",
    benefits: ["Replace aging equipment", "Upgrade cleanly", "Compatibility review first"]
  }
];

export const fullServices: ServiceItem[] = compactServices;

export const cameraOptions: CameraOption[] = [
  {
    title: "Simple Front Camera",
    audience: "Best for daily driving and basic incident recording.",
    summary: "A strong fit for drivers who want a clean, minimal setup."
  },
  {
    title: "Front + Rear Coverage",
    audience: "Best for stronger protection from both directions.",
    summary: "Recommended for commuters, family vehicles, and newer cars."
  },
  {
    title: "Parking Mode Setup",
    audience: "Best for protection while the car is parked.",
    summary: "Requires a compatible dash cam and proper hardwire setup."
  },
  {
    title: "Compact Hidden Look",
    audience: "Best for a low-profile installation.",
    summary: "Great when you want the camera to blend into the windshield area."
  },
  {
    title: "Interior / Rideshare Setup",
    audience: "Best for Uber, Lyft, taxi, or family monitoring.",
    summary: "Uses cabin-facing or multi-channel camera systems."
  },
  {
    title: "Premium Smart Setup",
    audience: "Best for app features, alerts, GPS, cloud-style features, or advanced monitoring.",
    summary: "Compatibility depends on the selected camera."
  }
];

export const reasons = [
  "Factory-style hidden wiring",
  "Careful installation for your vehicle",
  "Setup guidance before installation"
];

export const processSteps = ["Vehicle details", "Quote", "Installation", "Drive protected"];

export const faqs = [
  {
    question: "Will the wires be hidden?",
    answer:
      "Yes. The goal is a clean factory-style look with discreet routing through the interior where practical."
  },
  {
    question: "Do you install front and rear cameras?",
    answer:
      "Yes. Front-only and front-and-rear setups are both available depending on your vehicle and camera choice."
  },
  {
    question: "Can you set up parking mode?",
    answer:
      "Yes. Hardwire and parking mode support can be included when the camera and vehicle setup are a good match."
  },
  {
    question: "Do I need to buy the dash cam first?",
    answer:
      "Not always. If you are still deciding, send your vehicle details and we can help point you toward a suitable setup."
  },
  {
    question: "Do you provide mobile installation?",
    answer:
      "Yes. Mobile installation is available across LA & nearby areas based on schedule and location."
  }
];

export type PolicySection = {
  title: string;
  body: ReactNode;
};

export const policies: Record<
  "privacy" | "terms" | "refund" | "cookie" | "disclaimer",
  { title: string; description: string; sections: PolicySection[] }
> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "How Dashcam Experts handles basic customer contact details and appointment information for local installation services.",
    sections: [
      {
        title: "Website and Contact Details",
        body:
          "This policy applies to Dashcam Experts and the website at www.dashcamexperts.xyz. Contact email: info@dashcamexperts.xyz."
      },
      {
        title: "How Information Is Used",
        body:
          "We use the information you provide to answer questions, discuss compatibility, prepare estimates, arrange or reschedule appointments, and communicate about installation services."
      },
      {
        title: "Limited Scope",
        body:
          "Dashcam Experts provides installation services only. We do not provide legal advice, insurance advice, or guarantees of theft prevention, accident prevention, or total protection."
      },
      {
        title: "Sharing",
        body:
          "We do not sell personal information. Information may be shared only when reasonably necessary to operate the business or respond to a service request."
      }
    ]
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "General service terms for booking and receiving dash cam installation services from Dashcam Experts.",
    sections: [
      {
        title: "Service Scope",
        body:
          "Dashcam Experts provides dash cam installation services for customer vehicles and customer-provided equipment. We are not responsible for manufacturer defects, product failures, or hardware issues in customer-provided dash cams or accessories."
      },
      {
        title: "Compatibility and Equipment",
        body:
          "Customer-provided dash cams must be compatible and functional. Compatibility should be confirmed before installation, and we may also review it during the quote process."
      },
      {
        title: "Pricing",
        body:
          "Prices depend on the vehicle, dash cam model, installation type, wiring complexity, and any requested add-on work. Quotes are estimates until the installation details are confirmed."
      },
      {
        title: "Scheduling and Contact",
        body:
          "Installation appointments may be rescheduled due to availability, travel timing, vehicle-specific conditions, or other practical service factors. Contact: info@dashcamexperts.xyz."
      }
    ]
  },
  refund: {
    title: "Refund & Cancellation Policy",
    description:
      "Simple booking, cancellation, and estimate terms for a local dash cam installation service business.",
    sections: [
      {
        title: "Cancellations and Rescheduling",
        body:
          "If you need to cancel or reschedule, please contact Dashcam Experts as early as possible at info@dashcamexperts.xyz so the appointment can be adjusted."
      },
      {
        title: "Future Deposits",
        body:
          "If deposits are collected in the future, those deposits may be subject to cancellation terms that are disclosed at the time of booking."
      },
      {
        title: "Completed Work and Hardware Issues",
        body:
          "Questions about completed installation work should be raised promptly after service. Manufacturer defects or hardware problems with customer-provided dash cams may need to be addressed with the manufacturer or seller."
      },
      {
        title: "Estimates",
        body:
          "Because installation pricing depends on the vehicle, dash cam model, installation type, and wiring complexity, estimates may change if the requested work changes."
      }
    ]
  },
  cookie: {
    title: "Cookie Policy",
    description:
      "A straightforward explanation of basic website technologies that may support the Dashcam Experts website.",
    sections: [
      {
        title: "Basic Website Functionality",
        body:
          "The website at www.dashcamexperts.xyz may use standard browser storage, analytics, or technical files needed for core functionality, page performance, and general site improvement."
      },
      {
        title: "Third-Party Links",
        body:
          "External links such as WhatsApp, SMS, or email may use their own technologies and privacy practices once you leave this website."
      },
      {
        title: "Your Choices",
        body:
          "You can manage cookies and related storage preferences through your browser settings. Contact: info@dashcamexperts.xyz."
      }
    ]
  },
  disclaimer: {
    title: "Disclaimer",
    description:
      "Important limits and business clarifications related to Dashcam Experts installation services.",
    sections: [
      {
        title: "No Guarantee of Outcomes",
        body:
          "Dashcam Experts does not guarantee prevention of theft, accidents, collisions, damage, legal outcomes, insurance outcomes, or uninterrupted recording."
      },
      {
        title: "Installation Service Only",
        body:
          "Dashcam Experts provides installation services and general service information only. Nothing on this website is legal advice, insurance advice, or a substitute for manufacturer guidance."
      },
      {
        title: "Customer Equipment",
        body:
          "We are not responsible for manufacturer defects, firmware problems, compatibility limitations, or product failures related to customer-provided dash cams or accessories."
      },
      {
        title: "Service Adjustments and Contact",
        body:
          "Appointments and installation details may change based on vehicle access, compatibility findings, or routing complexity. Contact: info@dashcamexperts.xyz."
      }
    ]
  }
};
