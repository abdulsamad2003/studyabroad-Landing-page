import type { DomainId } from "@/config/types";
import { getHomepageAssets } from "./homepage-assets";

export type HomepageCategory = {
  title: string;
  description: string;
  href: string;
  image?: string;
};

export type HomepageStep = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  ctaLabel?: string;
};

export type HomepageStory = {
  title: string;
  year?: string;
  description: string;
  image?: string;
};

export type IntakeWindow = {
  intake: string;
  deadline: string;
  note: string;
};

export type QuickMatcherTool = {
  title: string;
  description: string;
  href: string;
  image: string;
  duration: string;
};

export type ProductServiceItem = {
  title: string;
  price: string;
  description: string;
  image: string;
  features: string[];
};

export type HomepageReview = {
  quote: string;
  name: string;
  credential: string;
  timeAgo: string;
};

export type HomepageFaq = {
  question: string;
  answer: string;
};

export type HomepageContent = {
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    points: string[];
  };
  quickMatcher: {
    eyebrow: string;
    heading: string;
    subheading: string;
    tools: QuickMatcherTool[];
  };
  categories: {
    heading: string;
    subheading?: string;
    items: HomepageCategory[];
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    subheading?: string;
    steps: HomepageStep[];
  };
  productsServices?: {
    eyebrow: string;
    heading: string;
    items: ProductServiceItem[];
  };
  successStories: {
    eyebrow: string;
    heading: string;
    subheading?: string;
    stories: HomepageStory[];
  };
  reviews?: {
    eyebrow: string;
    heading: string;
    items: HomepageReview[];
  };
  faqs?: {
    eyebrow: string;
    heading: string;
    subheading?: string;
    items: HomepageFaq[];
  };
  intakeTimeline?: {
    heading: string;
    intakes: IntakeWindow[];
  };
  providerListing: {
    eyebrow: string;
    heading: string;
    subheading: string;
    emptyMessage: string;
  };
  blogPreview: {
    heading: string;
    emptyMessage: string;
  };
  ctaBanner: {
    eyebrow: string;
    heading: string;
    subheading: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    highlights: string[];
  };
};

const studyAbroadContent: HomepageContent = {
  about: {
    eyebrow: "About",
    heading: "Your partner from application to arrival",
    paragraphs: [
      "We believe every student deserves transparent, ethical counselling. Unlike agents who push commission-driven universities, we shortlist schools based on your profile, budget, and career goals. Our Delhi headquarters hosts weekly walk-in sessions, and our AI advisor is available 24/7 for instant answers between counsellor meetings.",
      "Since 2012, Global Abroad Solutions has guided students from India and South Asia through every step of the international education journey. Our team of certified counsellors, visa specialists, and essay editors work alongside our AI advisor to deliver faster, more accurate guidance — from your first country comparison to your first week on campus abroad.",
    ],
    points: [
      "Free 30-minute profile evaluation for new students",
      "Dedicated visa desk with former embassy documentation reviewers",
      "IELTS & visa interview mock sessions every weekend",
      "Education loan partnerships with 6 major Indian banks",
      "Pre-departure orientation and airport pickup coordination",
      "No hidden fees — pricing published upfront for every package",
    ],
  },
  quickMatcher: {
    eyebrow: "AI matching",
    heading: "Smart tools for your application",
    subheading:
      "Run a free assessment in minutes — no account, no commitment. Each tool answers a different question on your study abroad journey.",
    tools: [
      {
        title: "Eligibility check",
        description: "Which universities fit your academic profile and target country.",
        href: "/tools/eligibility",
        image: getHomepageAssets("studyabroad").categoryImages["United Kingdom"],
        duration: "2 min",
      },
      {
        title: "Cost calculator",
        description: "Full-year tuition, living, and visa costs for your shortlist.",
        href: "/tools/calculator",
        image: getHomepageAssets("studyabroad").categoryImages.Germany,
        duration: "3 min",
      },
      {
        title: "Admission predictor",
        description: "Safe, reach, and dream tiers based on your scores and timeline.",
        href: "/tools/predictor",
        image: getHomepageAssets("studyabroad").categoryImages.Australia,
        duration: "2 min",
      },
    ],
  },
  categories: {
    heading: "Popular study destinations",
    subheading: "Explore countries where our students land offers most often — with guides, costs, and intakes.",
    items: [
      {
        title: "United Kingdom",
        description: "Top-ranked universities and post-study work options.",
        href: "/tools/eligibility",
        image: getHomepageAssets("studyabroad").categoryImages["United Kingdom"],
      },
      {
        title: "Canada",
        description: "Affordable programs with strong PR pathways.",
        href: "/tools/eligibility",
        image: getHomepageAssets("studyabroad").categoryImages.Canada,
      },
      {
        title: "Australia",
        description: "High quality of life and global degree recognition.",
        href: "/tools/eligibility",
        image: getHomepageAssets("studyabroad").categoryImages.Australia,
      },
      {
        title: "Germany",
        description: "Low tuition and strong engineering programs.",
        href: "/tools/calculator",
        image: getHomepageAssets("studyabroad").categoryImages.Germany,
      },
    ],
  },
  howItWorks: {
    eyebrow: "How we work",
    heading: "Your journey with us",
    steps: [
      {
        title: "Profile assessment",
        description:
          "Share your academics, test scores, budget, and career goals. Receive a personalized roadmap within 48 hours.",
      },
      {
        title: "University shortlist",
        description:
          "We match you to 8–12 universities across reach, match, and safe tiers — with admit probability insights.",
      },
      {
        title: "Applications & funding",
        description:
          "SOP editing, LOR guidance, form submissions, and parallel scholarship applications.",
      },
      {
        title: "Visa & departure",
        description:
          "Document review, mock interviews, accommodation support, and pre-departure checklist.",
      },
    ],
  },
  productsServices: {
    eyebrow: "Products & Services",
    heading: "What we offer",
    items: [
      {
        title: "University Shortlist Package",
        price: "₹4,999",
        description:
          "AI-matched shortlist of 8–12 universities with admit probability scores, cost breakdowns, and a 45-minute counsellor review call.",
        image: getHomepageAssets("studyabroad").productImages.shortlist,
        features: [
          "Profile analysis report",
          "Country comparison summary",
          "One counsellor video call",
        ],
      },
      {
        title: "Premium Application Support",
        price: "₹24,999",
        description:
          "End-to-end application management for up to 6 universities — SOP drafting, LOR templates, deadline tracking, and form review.",
        image: getHomepageAssets("studyabroad").productImages.application,
        features: [
          "2 SOP edit rounds",
          "Dedicated application manager",
          "Scholarship shortlist included",
        ],
      },
      {
        title: "Visa Filing Assistance",
        price: "₹9,999",
        description:
          "Complete visa support: document checklist, financial proof review, mock interview, and application lodgement guidance.",
        image: getHomepageAssets("studyabroad").productImages.visa,
        features: [
          "Country-specific checklist",
          "2 mock interview sessions",
          "Rejection appeal support",
        ],
      },
    ],
  },
  successStories: {
    eyebrow: "Our Work",
    heading: "Success stories",
    stories: [
      {
        title: "Oxford MSc Admit",
        year: "2025",
        description:
          "Delhi student with 8.2 CGPA secured Computer Science admit with partial scholarship after our SOP and funding strategy support.",
        image: "/images/studyabroad/success/oxford.png",
      },
      {
        title: "Toronto MBA",
        year: "2024",
        description:
          "Working professional admitted to Rotman with GMAT 710 — full application and interview prep completed in 14 weeks.",
        image: "/images/studyabroad/success/toronto.png",
      },
      {
        title: "Melbourne PhD",
        year: "2024",
        description:
          "Research proposal coaching and supervisor outreach led to fully funded PhD in renewable energy.",
        image: "/images/studyabroad/success/melbourne.png",
      },
      {
        title: "UK Tier-4 Visa",
        year: "2025",
        description:
          "12 student visas approved in January intake batch with zero refusals after document audit.",
        image: "/images/studyabroad/success/uk-visa.png",
      },
    ],
  },
  reviews: {
    eyebrow: "Reviews",
    heading: "What students say",
    items: [
      {
        quote:
          "Got my UK visa in 3 weeks after a previous rejection elsewhere. The document audit made all the difference.",
        name: "Ananya R.",
        credential: "MSc · University of Manchester",
        timeAgo: "2 weeks ago",
      },
      {
        quote:
          "Shortlist was spot on — admitted to 3 of my top 5 choices. Counsellors never pushed universities I didn't want.",
        name: "Rahul M.",
        credential: "MBA · Rotman, Toronto",
        timeAgo: "1 month ago",
      },
      {
        quote:
          "Parents attended the orientation session and felt much more confident. Loan team helped secure funding in 10 days.",
        name: "Sneha K.",
        credential: "BEng · UNSW Sydney",
        timeAgo: "6 weeks ago",
      },
      {
        quote:
          "Research proposal support was exceptional. Supervisor outreach emails they drafted got me three interview calls.",
        name: "Vikram P.",
        credential: "PhD · TU Munich",
        timeAgo: "2 months ago",
      },
    ],
  },
  faqs: {
    eyebrow: "FAQs",
    heading: "Frequently asked questions",
    subheading:
      "Answers to the questions students and parents ask most often.",
    items: [
      {
        question: "Do you charge for the first consultation?",
        answer:
          "No. Every new student receives a free 30-minute profile evaluation with a senior counsellor. We discuss your goals, budget, and realistic options before any paid package.",
      },
      {
        question: "Which countries do you specialize in?",
        answer:
          "We place students primarily in the UK, USA, Canada, Australia, Germany, Ireland, and Singapore. Our visa desk covers all major English-speaking destinations.",
      },
      {
        question: "How is Global Abroad different from other agents?",
        answer:
          "We publish all fees upfront, do not accept undisclosed commissions from universities, and combine human counsellors with AI tools for faster document checks and shortlisting.",
      },
      {
        question: "Can you help with education loans?",
        answer:
          "Yes. We partner with six Indian lenders and help prepare the financial documentation required for both loan approval and visa applications.",
      },
      {
        question: "What if my visa is refused?",
        answer:
          "Our Visa Filing package includes one free rejection review. We analyze the refusal letter, identify gaps, and guide reapplication or appeal where appropriate.",
      },
    ],
  },
  intakeTimeline: {
    heading: "Upcoming intakes",
    intakes: [
      { intake: "Fall 2026", deadline: "March 2026", note: "US & Canada applications" },
      { intake: "September 2026", deadline: "May 2026", note: "UK & EU applications" },
      { intake: "February 2027", deadline: "October 2026", note: "Australia & NZ applications" },
    ],
  },
  providerListing: {
    eyebrow: "Partner network",
    heading: "Featured universities",
    subheading:
      "Top institutions where our students land offers — explore locations, programs, and what makes each stand out.",
    emptyMessage: "University previews will appear here once listings are available.",
  },
  blogPreview: {
    heading: "Latest from our blog",
    emptyMessage: "New guides and articles will appear here soon.",
  },
  ctaBanner: {
    eyebrow: "Start today",
    heading: "Ready to find your dream university?",
    subheading:
      "Get a personalised shortlist, cost estimate, and expert counselling — free to start, no account required.",
    ctaLabel: "Start your application",
    ctaHref: "/apply",
    secondaryCtaLabel: "Try free tools",
    secondaryCtaHref: "/tools/eligibility",
    highlights: ["Free to use", "Expert counsellors", "Results in minutes"],
  },
};

const ivfContent: HomepageContent = {
  about: {
    eyebrow: "About",
    heading: "Your partner from first consultation to positive outcome",
    paragraphs: [
      "We believe every family deserves honest, evidence-based fertility guidance. Unlike clinics that push unnecessary cycles, we help you compare options based on your medical profile, age, and budget. Our counsellors are available for private consultations, and our AI advisor is here 24/7 for answers between appointments.",
      "Our network of verified IVF centres across India and South Asia is built on published success rates, transparent pricing, and specialist-led care. From your first eligibility check to embryo transfer and beyond, we combine human expertise with AI tools so you can make confident decisions at every step.",
    ],
    points: [
      "Free initial eligibility assessment for new patients",
      "Dedicated counsellors matched to your treatment pathway",
      "Clinic comparisons with published success rate data",
      "Financing guidance through partner healthcare lenders",
      "Pre-treatment preparation and medication planning support",
      "No hidden fees — treatment costs explained upfront",
    ],
  },
  quickMatcher: {
    eyebrow: "Fertility tools",
    heading: "Know your options before you commit",
    subheading:
      "Private, clinician-informed assessments — free to use. Understand treatment fit, costs, and outlook before booking a consultation.",
    tools: [
      {
        title: "Eligibility assessment",
        description: "Which treatments align with your age, AMH levels, and medical history.",
        href: "/tools/eligibility",
        image: getHomepageAssets("ivf").categoryImages["IVF cycles"],
        duration: "2 min",
      },
      {
        title: "Treatment calculator",
        description: "Per-cycle breakdown of medication, procedure, and hospital stay costs.",
        href: "/tools/calculator",
        image: getHomepageAssets("ivf").categoryImages["Egg freezing"],
        duration: "3 min",
      },
      {
        title: "Success predictor",
        description: "Personalised outcome estimates based on your fertility profile.",
        href: "/tools/predictor",
        image: getHomepageAssets("ivf").categoryImages["IUI treatment"],
        duration: "2 min",
      },
    ],
  },
  categories: {
    heading: "Treatment pathways",
    subheading: "Every journey is different. Start with the treatment area that matches where you are today.",
    items: [
      {
        title: "IVF cycles",
        description: "Compare clinics by success rates and treatment approach.",
        href: "/tools/eligibility",
        image: getHomepageAssets("ivf").categoryImages["IVF cycles"],
      },
      {
        title: "Egg freezing",
        description: "Plan fertility preservation with transparent cost estimates.",
        href: "/tools/calculator",
        image: getHomepageAssets("ivf").categoryImages["Egg freezing"],
      },
      {
        title: "IUI treatment",
        description: "Lower-complexity options for early-stage fertility care.",
        href: "/tools/eligibility",
        image: getHomepageAssets("ivf").categoryImages["IUI treatment"],
      },
      {
        title: "Donor programs",
        description: "Guidance on donor egg and embryo pathways.",
        href: "/tools/predictor",
        image: getHomepageAssets("ivf").categoryImages["Donor programs"],
      },
    ],
  },
  howItWorks: {
    eyebrow: "Your journey",
    heading: "From questions to the right clinic",
    subheading:
      "A guided path — start with data-driven tools, then speak to specialists when you are ready.",
    steps: [
      {
        title: "Understand your eligibility",
        description:
          "Share your age, AMH, and treatment history. See which pathways — IVF, IUI, or preservation — fit your situation.",
        image: getHomepageAssets("ivf").categoryImages["IVF cycles"],
        href: "/tools/eligibility",
        ctaLabel: "Check eligibility",
      },
      {
        title: "Compare clinics confidently",
        description:
          "Review success rates, locations, and cost estimates. Shortlist clinics that align with your goals and budget.",
        image: getHomepageAssets("ivf").categoryImages["Egg freezing"],
        href: "/tools/calculator",
        ctaLabel: "Estimate treatment costs",
      },
      {
        title: "Connect with specialists",
        description:
          "Apply to speak with fertility counsellors at your matched clinics. No pressure — move forward when you feel ready.",
        image: getHomepageAssets("ivf").categoryImages["Donor programs"],
        href: "/apply",
        ctaLabel: "Speak with a counsellor",
      },
    ],
  },
  successStories: {
    eyebrow: "Real families",
    heading: "Family success stories",
    subheading:
      "Couples who started with our free tools and found the right clinic, plan, and support for their journey.",
    stories: [
      {
        title: "Meera & Arjun, Pune",
        description:
          "We compared three clinics before choosing our specialist. Successful IVF cycle on second attempt.",
      },
      {
        title: "Sneha, Hyderabad",
        description:
          "The eligibility tool gave us clarity on next steps. Started treatment within six weeks.",
      },
      {
        title: "Kavita & Rahul, Chennai",
        description:
          "Cost estimates helped us plan our treatment budget. Completed first IVF cycle with confidence.",
      },
    ],
  },
  providerListing: {
    eyebrow: "Trusted partners",
    heading: "Featured clinics",
    subheading:
      "Hand-picked fertility centres with published outcomes, transparent pricing, and specialist-led care teams.",
    emptyMessage: "Clinic previews will appear here once listings are available.",
  },
  blogPreview: {
    heading: "Latest fertility guides",
    emptyMessage: "New articles and guides will appear here soon.",
  },
  ctaBanner: {
    eyebrow: "Take the next step",
    heading: "Ready to talk to a fertility specialist?",
    subheading:
      "You've explored your options — now connect with counsellors who can guide your treatment plan with clarity and care.",
    ctaLabel: "Speak with an expert",
    ctaHref: "/apply",
    secondaryCtaLabel: "Check eligibility first",
    secondaryCtaHref: "/tools/eligibility",
    highlights: ["Private & confidential", "Clinician-informed", "No pressure to commit"],
  },
};

export function getHomepageContent(domainId: DomainId): HomepageContent {
  return domainId === "ivf" ? ivfContent : studyAbroadContent;
}

export function hasIntakeTimeline(domainId: DomainId): boolean {
  return Boolean(getHomepageContent(domainId).intakeTimeline);
}
