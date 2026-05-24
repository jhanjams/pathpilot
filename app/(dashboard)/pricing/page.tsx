"use client";

import React, { useState } from "react";
import { Check, HelpCircle, Briefcase, Award, Sparkles, TrendingUp, X, ChevronDown, ArrowRight } from "lucide-react";

// ==========================================
// TYPES & CONFIGURATION
// ==========================================

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PriceConfig {
  monthlyPrice: number;
  annualPrice: number; // yearly price billed
  originalYearlyPrice?: number; // annual strikethrough price pre-discount
  savingsText?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  price: PriceConfig;
  subtext: string;
  features: PlanFeature[];
  ctaText: string;
  ctaStyle: "ghost" | "solid-indigo" | "solid-amber" | "outline-amber";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ComparisonRow {
  featureName: string;
  category: "Core Features" | "AI & Placement Help" | "Recruiter Tools" | "Support";
  free: string | boolean;
  proStudent: string | boolean;
  careerGraduate: string | boolean;
  b2bRecruiter: string | boolean;
}

export const pricingConfig: {
  plans: PricingPlan[];
  comparison: ComparisonRow[];
  faqs: FAQItem[];
} = {
  plans: [
    {
      id: "free",
      name: "Free",
      price: {
        monthlyPrice: 0,
        annualPrice: 0,
      },
      subtext: "No credit card needed. Start today.",
      features: [
        { text: "Basic AI profile analysis", included: true },
        { text: "5 opportunity matches per month", included: true },
        { text: "1 skill gap report per month", included: true },
        { text: "Basic resume score (no suggestions)", included: true },
        { text: "Community forum access", included: true },
      ],
      ctaText: "Get Started Free",
      ctaStyle: "ghost",
    },
    {
      id: "pro-student",
      name: "Pro — Student",
      badge: "MOST POPULAR",
      isPopular: true,
      price: {
        monthlyPrice: 299,
        annualPrice: 2390,
        originalYearlyPrice: 3588,
        savingsText: "Save ₹1,198",
      },
      subtext: "For college students serious about placements.",
      features: [
        { text: "Everything in Free", included: true },
        { text: "Unlimited AI job & internship matching", included: true },
        { text: "Full skill gap analysis + learning roadmap", included: true },
        { text: "Unlimited resume ATS optimisation", included: true },
        { text: "AI career coach chat (unlimited)", included: true },
        { text: "Mock interview sessions (10/month)", included: true },
        { text: "Career roadmap generation", included: true },
        { text: "Webinar early-bird access", included: true },
      ],
      ctaText: "Upgrade to Pro",
      ctaStyle: "solid-indigo",
    },
    {
      id: "career-graduate",
      name: "Career — Graduate",
      price: {
        monthlyPrice: 599,
        annualPrice: 4790,
        originalYearlyPrice: 7188,
        savingsText: "Save ₹2,398",
      },
      subtext: "For graduates ready to land their first or next role.",
      features: [
        { text: "Everything in Pro Student", included: true },
        { text: "LinkedIn profile full optimisation", included: true },
        { text: "Salary negotiation coaching", included: true },
        { text: "Priority application support", included: true },
        { text: "Industry mentor connect (beta)", included: true },
        { text: "Interview preparation personalised by role", included: true },
        { text: "Unlimited mock interviews", included: true },
      ],
      ctaText: "Get Career Plan",
      ctaStyle: "solid-amber",
    },
  ],
  comparison: [
    {
      featureName: "AI Profile Analysis",
      category: "Core Features",
      free: "Basic",
      proStudent: "Advanced Dashboard",
      careerGraduate: "Deep Skills Mapping",
      b2bRecruiter: "Custom Company Benchmarking",
    },
    {
      featureName: "Weekly Matches",
      category: "Core Features",
      free: "5 matches/mo",
      proStudent: "Unlimited",
      careerGraduate: "Unlimited + Elite Tier",
      b2bRecruiter: "Direct Invite Queries",
    },
    {
      featureName: "Skill Gap Analysis",
      category: "Core Features",
      free: "1 report/mo",
      proStudent: "Full & Dynamic",
      careerGraduate: "Full & Dynamic",
      b2bRecruiter: "Included for Talent Pools",
    },
    {
      featureName: "Community Forum Hub",
      category: "Core Features",
      free: true,
      proStudent: true,
      careerGraduate: true,
      b2bRecruiter: true,
    },
    {
      featureName: "ATS Resume Optimization",
      category: "AI & Placement Help",
      free: "Basic Score",
      proStudent: "Unlimited Suggestions",
      careerGraduate: "Unlimited Suggestions",
      b2bRecruiter: "Automatic ATS Filtering",
    },
    {
      featureName: "AI Career Coach (24/7 Chat)",
      category: "AI & Placement Help",
      free: false,
      proStudent: "Unlimited",
      careerGraduate: "Unlimited",
      b2bRecruiter: false,
    },
    {
      featureName: "Mock Interview Sessions",
      category: "AI & Placement Help",
      free: false,
      proStudent: "10 / month",
      careerGraduate: "Unlimited",
      b2bRecruiter: false,
    },
    {
      featureName: "Personalized Study Roadmap",
      category: "AI & Placement Help",
      free: false,
      proStudent: true,
      careerGraduate: true,
      b2bRecruiter: false,
    },
    {
      featureName: "LinkedIn Profile Optimization",
      category: "AI & Placement Help",
      free: false,
      proStudent: "Tips only",
      careerGraduate: "Full Writing Assistant",
      b2bRecruiter: false,
    },
    {
      featureName: "Industry Mentor Connect",
      category: "AI & Placement Help",
      free: false,
      proStudent: false,
      careerGraduate: "Included (Beta)",
      b2bRecruiter: false,
    },
    {
      featureName: "AI Talent Searching",
      category: "Recruiter Tools",
      free: false,
      proStudent: false,
      careerGraduate: false,
      b2bRecruiter: "Verified Candidates Only",
    },
    {
      featureName: "Campus Placement Campaigns",
      category: "Recruiter Tools",
      free: false,
      proStudent: false,
      careerGraduate: false,
      b2bRecruiter: "Unlimited campaigns",
    },
    {
      featureName: "Verified Skill Scorecards",
      category: "Recruiter Tools",
      free: false,
      proStudent: false,
      careerGraduate: false,
      b2bRecruiter: true,
    },
    {
      featureName: "Support Level",
      category: "Support",
      free: "Self-serve/Email",
      proStudent: "Priority Support",
      careerGraduate: "24-hr Placement Helpline",
      b2bRecruiter: "Dedicated Account Manager",
    },
  ],
  faqs: [
    {
      id: "q1",
      question: "Can I switch plans anytime?",
      answer: "Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings. If you upgrade mid-cycle, we prorate the difference.",
    },
    {
      id: "q2",
      question: "Is the free plan actually free — forever?",
      answer: "Completely. No credit card, no hidden charges, no trial period. The free plan is our way of making sure every student can access basic career guidance regardless of their financial situation.",
    },
    {
      id: "q3",
      question: "What payment methods do you accept?",
      answer: "We accept UPI, all major credit and debit cards, net banking, and wallets through our secure Razorpay integration. Annual plans can also be paid via bank transfer.",
    },
    {
      id: "q4",
      question: "Do you offer discounts for students who cannot afford Pro?",
      answer: "Yes. We offer a scholarship plan for students from low-income backgrounds at a significantly reduced rate. Apply from your profile dashboard and our team reviews within 48 hours.",
    },
    {
      id: "q5",
      question: "How is the B2B Recruiter plan different from just posting a job on Naukri?",
      answer: "Posting on Naukri gives you applications from anyone. PathPilot gives you AI-ranked candidates who are specifically matched to your role requirements, with verified skill scores and profile analyses already done — so your team shortlists in hours, not weeks.",
    },
    {
      id: "q6",
      question: "Is there a free trial for the Pro plan?",
      answer: "Yes. New users get a 7-day full Pro trial automatically when they sign up — no payment required. You will only be charged if you choose to continue.",
    },
  ],
};

// ==========================================
// CUSTOM COMPONENT IMPLEMENTATIONS (SHADCN style)
// ==========================================

const CustomBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none transition-colors focus:outline-none ${className}`}
  >
    {children}
  </span>
);

const CustomSeparator = ({ className }: { className?: string }) => (
  <div className={`h-[1px] w-full bg-slate-800 ${className}`} />
);

const CustomSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:ring-offset-2 ${
      checked ? "bg-indigo-600" : "bg-slate-750 border border-slate-700"
    }`}
  >
    <span
      className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// ==========================================
// MAIN PRICING PAGE COMPONENT
// ==========================================

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleBilling = () => setIsAnnual(!isAnnual);

  const handleFaqToggle = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const calculateDisplayPrice = (planPrice: PriceConfig) => {
    if (planPrice.monthlyPrice === 0) return { priceText: "₹0", sub: "/ forever" };

    if (isAnnual) {
      // Equivalent monthly calculated rate for display rounded to nearest rupee
      const equivMonthly = Math.floor(planPrice.annualPrice / 12);
      return {
        priceText: `₹${equivMonthly}`,
        sub: "/ month",
        billedYearly: `Billed annually at ₹${planPrice.annualPrice.toLocaleString("en-IN")}/year`,
        savings: planPrice.savingsText,
        originalYearlyPrice: planPrice.originalYearlyPrice,
      };
    }

    return {
      priceText: `₹${planPrice.monthlyPrice}`,
      sub: "/ month",
    };
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#FAFAFA] font-sans relative overflow-hidden pb-16">
      {/* Background visual accents */}
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-[-10%] w-[450px] h-[450px] bg-indigo-500/3 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-20">
        {/* ==========================================
            1. PAGE HEADER SECTION
            ========================================== */}
        <header className="text-center max-w-3xl mx-auto mt-8 mb-16 select-none flex flex-col items-center">
          <CustomBadge className="bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 tracking-widest px-3.5 py-1 text-[10px] uppercase font-bold font-mono mb-4">
            Simple, honest pricing
          </CustomBadge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-white mb-6">
            Start free. Grow at your own pace.
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-10 text-center max-w-2xl">
            PathPilot is free to start and built to grow with you — whether you are a school student
            discovering careers for the first time or a recruiter hiring at scale. Every plan includes
            our core AI engine. Upgrade when you are ready.
          </p>

          {/* Monthly / Annual billing switch toggle */}
          <div className="inline-flex items-center gap-3 bg-[#1E293B]/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                !isAnnual ? "bg-indigo-600/15 text-indigo-400 font-bold border border-indigo-500/25" : "text-[#94A3B8] hover:text-[#FAFAFA]"
              }`}
            >
              Monthly billing
            </button>
            <CustomSwitch checked={isAnnual} onChange={setIsAnnual} />
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
                isAnnual ? "bg-indigo-600/15 text-indigo-400 font-bold border border-indigo-500/25" : "text-[#94A3B8] hover:text-[#FAFAFA]"
              }`}
            >
              Annual plan
              <CustomBadge className="bg-[#F59E0B] text-[#0F172A] text-[9px] px-1.5 py-0.5 tracking-wider font-extrabold">
                SAVE 20%
              </CustomBadge>
            </button>
          </div>
        </header>

        {/* ==========================================
            2. PRICING CARDS SECTION
            ========================================== */}
        <div id="pricing-cards-section" className="space-y-8">
          {/* Row 1: 3 cards side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingConfig.plans.map((plan) => {
              const display = calculateDisplayPrice(plan.price);

              return (
                <div
                  key={plan.id}
                  id={`card-plan-${plan.id}`}
                  className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-[#1E293B]/90 border-2 border-indigo-500 shadow-[0_10px_35px_rgba(99,102,241,0.15)] hover:shadow-[0_15px_45px_rgba(99,102,241,0.25)] md:scale-[1.03] z-10"
                      : "bg-[#1E293B]/70 border border-slate-800 hover:border-indigo-500/40 hover:shadow-[0_10px_30px_rgba(99,102,241,0.08)]"
                  } hover:-translate-y-1.5`}
                >
                  {/* Popular pill */}
                  {plan.isPopular && plan.badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                      <CustomBadge className="bg-indigo-600 text-white border border-indigo-400/30 px-3.5 py-1 text-[9px] font-bold tracking-widest shadow-md">
                        {plan.badge}
                      </CustomBadge>
                    </div>
                  )}

                  {/* Top Block */}
                  <div>
                    <h3 className="text-xl font-bold font-sora text-white mb-2">{plan.name}</h3>
                    <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed min-h-[32px]">{plan.subtext}</p>

                    {/* Pricing */}
                    <div className="mb-6 flex flex-col justify-start">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold text-white font-sora">{display.priceText}</span>
                        <span className="text-xs text-[#94A3B8] font-semibold">{display.sub}</span>
                      </div>

                      {/* Yearly billed metadata updates */}
                      {isAnnual && plan.price.monthlyPrice > 0 ? (
                        <div className="mt-2 text-[11px] text-[#94A3B8] select-none font-sans flex flex-col gap-0.5">
                          <p className="font-semibold text-indigo-400">{display.billedYearly}</p>
                          {display.originalYearlyPrice && (
                            <p className="text-slate-500 line-through">
                              Original price: ₹{display.originalYearlyPrice.toLocaleString("en-IN")}
                            </p>
                          )}
                          {display.savings && (
                            <span className="inline-block self-start mt-0.5 px-2 py-0.5 text-[9px] font-bold uppercase rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/15">
                              {display.savings}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="h-[44px]" /> // spacer
                      )}
                    </div>

                    <CustomSeparator className="my-6 opacity-60" />

                    {/* Feature Lists */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed text-[#FAFAFA]">
                          <span className="text-indigo-400 mt-0.5 shrink-0 select-none">
                            <Check className="w-4 h-4 text-emerald-400 bg-emerald-500/10 rounded-full p-0.5" />
                          </span>
                          <span className="text-slate-300">{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <div>
                    {plan.ctaStyle === "ghost" ? (
                      <button className="w-full text-center font-sora font-semibold text-xs py-3.5 rounded-xl border border-indigo-500/40 text-indigo-400 cursor-pointer bg-transparent hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300">
                        {plan.ctaText}
                      </button>
                    ) : plan.ctaStyle === "solid-indigo" ? (
                      <button className="w-full text-center font-sora font-bold text-xs py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.45)] transition-all duration-300">
                        {plan.ctaText}
                      </button>
                    ) : (
                      <button className="w-full text-center font-sora font-bold text-xs py-3.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0F172A] cursor-pointer shadow-[0_4px_15px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.35)] transition-all duration-300">
                        {plan.ctaText}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: B2B Recruiter (Wide grid layout) */}
          <div
            id="card-plan-b2b"
            className="bg-[#1E293B] border-t-4 border-t-amber-500 border-x border-b border-slate-800 rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-amber-500/30"
          >
            {/* Split content columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Column (Recruiter details & pricing) - span 5 */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-[#F59E0B]" />
                    <CustomBadge className="bg-amber-500/15 text-amber-400 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider">
                      Enterprise Tier
                    </CustomBadge>
                  </div>
                  <h3 className="text-2xl font-bold font-sora text-white mb-2">B2B — Recruiter</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                    {pricingConfig.plans[0] &&
                      "For companies, startups, and campus recruiters hiring at scale. Unlock pre-vetted matching."}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl font-extrabold text-[#F59E0B] font-sora">
                      {isAnnual ? "₹3,999" : "₹4,999"}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-semibold">/ month per seat</span>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed pr-2 mb-6">
                    Give your hiring team access to India's most intelligent student talent pool. PathPilot's B2B
                    dashboard lets recruiters search pre-verified, skill-matched candidates, post opportunities directly
                    to matched students, and run entire campus hiring drives from one place.
                  </p>
                </div>
              </div>

              {/* Right Column (Feature List + CTA) - span 7 */}
              <div className="lg:col-span-7 bg-[#0F172A]/40 border border-slate-800/65 rounded-xl p-6 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-4">
                    Enterprise Features Included:
                  </h4>
                  {/* 2 column feature list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 mb-8">
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">AI-filtered verified talent pool</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Campus hiring campaigns</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Verified skill profiles & scores</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Resume access & shortlisting tools</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Branded recruiter dashboard</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Analytics & placement reports</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Dedicated account manager</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-amber-400 bg-amber-500/10 rounded-full p-0.5 mt-0.5 shrink-0" />
                      <span className="text-slate-300">Custom API integration</span>
                    </div>
                  </div>
                </div>

                {/* Recruiter button callout */}
                <div>
                  <button className="w-full text-center font-sora font-semibold text-xs py-3.5 bg-transparent border border-amber-500/30 text-amber-400 hover:text-[#0F172A] hover:bg-[#F59E0B] hover:border-amber-400 transition-all cursor-pointer duration-300 rounded-xl">
                    Contact Sales
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-3 font-sans select-none">
                    Minimum 3 months. Volume discounts available for 5+ seats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. COMPARISON TABLE SECTION
            ========================================== */}
        <section className="mt-24 select-none">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold font-sora text-white">
              Not sure which plan is right for you? Compare everything.
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1.5">No hidden constraints, detailed functional mapping.</p>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-[#1E293B]/60 backdrop-blur-md">
            <table className="w-full border-collapse text-left text-xs text-slate-300 min-w-[700px]">
              {/* Table Column headers - sticky on scroll */}
              <thead className="sticky top-0 bg-[#111827] border-b border-slate-800 text-[#FAFAFA] font-sora font-semibold select-none">
                <tr>
                  <th className="p-4 md:p-5 w-[28%] font-medium">Feature Matrix</th>
                  <th className="p-4 text-center w-[18%] font-medium">Free</th>
                  <th className="p-4 text-center w-[18%] bg-indigo-500/10 border-x border-indigo-500/20 text-[#FAFAFA] font-bold">
                    Pro Student
                  </th>
                  <th className="p-4 text-center w-[18%] font-medium">Career Graduate</th>
                  <th className="p-4 text-center w-[18%] font-medium">B2B Recruiter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {/* Organize rows by Category */}
                {(["Core Features", "AI & Placement Help", "Recruiter Tools", "Support"] as const).map((catName) => {
                  const rowsInCategory = pricingConfig.comparison.filter((row) => row.category === catName);

                  return (
                    <React.Fragment key={catName}>
                      {/* Sub-header row for classification */}
                      <tr className="bg-[#0F172A]/85 text-indigo-400 select-none font-bold font-mono tracking-wider text-[10px] uppercase">
                        <td colSpan={5} className="p-3 pl-5">
                          {catName}
                        </td>
                      </tr>

                      {rowsInCategory.map((row, idx) => {
                        const renderValue = (val: string | boolean) => {
                          if (val === true) {
                            return <Check className="w-4 h-4 mx-auto text-emerald-400 bg-emerald-500/10 rounded-full p-0.5" />;
                          }
                          if (val === false) {
                            return <X className="w-4 h-4 mx-auto text-slate-600" />;
                          }
                          return <span className="text-xs text-slate-300 font-medium">{val}</span>;
                        };

                        return (
                          <tr
                            key={idx}
                            className="hover:bg-[#1E293B] transition-colors duration-100 odd:bg-slate-900/10"
                          >
                            <td className="p-4 font-semibold text-slate-200">{row.featureName}</td>
                            <td className="p-4 text-center">{renderValue(row.free)}</td>
                            {/* Pro Column highlighted */}
                            <td className="p-4 text-center bg-indigo-500/5 border-x border-indigo-500/10 font-medium">
                              {renderValue(row.proStudent)}
                            </td>
                            <td className="p-4 text-center">{renderValue(row.careerGraduate)}</td>
                            <td className="p-4 text-center">{renderValue(row.b2bRecruiter)}</td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            4. FAQ SECTION (Interactive Accordion)
            ========================================== */}
        <section className="mt-28 max-w-4xl mx-auto">
          <div className="text-center mb-12 select-none">
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-white">Questions people actually ask.</h2>
            <p className="text-xs text-[#94A3B8] mt-2">Clear insights about plans, billing, and commitments.</p>
          </div>

          <div className="space-y-4">
            {pricingConfig.faqs.map((faq) => {
              const isOpen = openFaq === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-[#1E293B]/70 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => handleFaqToggle(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold hover:bg-slate-800/30 transition-colors font-sora text-slate-200 cursor-pointer outline-none focus:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Slide body */}
                  <div
                    className={`transition-all duration-300 border-t border-slate-800/35 overflow-hidden ${
                      isOpen ? "max-h-[300px] p-5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs text-[#94A3B8] leading-relaxed select-text">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            5. BOTTOM CTA STRIP
            ========================================== */}
        <section className="mt-28 mb-10 select-none">
          <div className="bg-gradient-to-r from-indigo-950/90 to-[#1E293B]/90 border border-indigo-500/20 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-[-30%] right-[-10%] w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none select-none" />

            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold font-sora text-white mb-2">Still not sure? Start free today.</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                No credit card. No pressure. Just a smarter, AI-powered path forward to placements.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 font-sora font-bold text-xs bg-[#F59E0B] hover:bg-amber-400 text-[#0F172A] uppercase tracking-wider rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] transition-all flex items-center justify-center gap-2">
                Create Your Free Account
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
