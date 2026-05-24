"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, Trophy, ArrowRight } from "lucide-react";

export interface Review {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarColor: string; // Tailwind class background color or inline style
  stars: number;
  badge: string;
  review: string;
  categories: string[];
}

export const reviewsData: Review[] = [
  {
    id: "r1",
    name: "Priya Sharma",
    role: "B.Tech CSE, 3rd Year — VIT Vellore",
    avatarInitials: "PS",
    avatarColor: "bg-indigo-600 text-white",
    stars: 5,
    badge: "Got Internship at Razorpay",
    categories: ["Got Internship", "College"],
    review: "I had been applying to internships for four months straight and getting nowhere. My resume was decent, I thought my skills were fine — but I kept getting rejected at the screening stage. PathPilot's skill gap analysis showed me in 10 minutes that I was missing SQL and system design basics, which every product company asks for. I followed the roadmap it gave me, spent six weeks upskilling, and then applied again. Got my Razorpay internship offer in the second week. I genuinely could not believe it was that specific and that accurate."
  },
  {
    id: "r2",
    name: "Arjun Mehta",
    role: "MBA Graduate, Fresher — NMIMS Mumbai",
    avatarInitials: "AM",
    avatarColor: "bg-cyan-600 text-white",
    stars: 5,
    badge: "Placed at Deloitte",
    categories: ["Got Job", "Graduate"],
    review: "Nobody told me that my MBA resume was written completely wrong for consulting roles. PathPilot's ATS analyser gave my resume a 41 out of 100 and broke down every single section with specific rewrites. The AI coach basically rebuilt my resume from scratch with me. Three weeks later I had a Deloitte interview and I used the mock interview feature to prepare. Got the offer. This platform is genuinely different from anything else I have used."
  },
  {
    id: "r3",
    name: "Sneha Kulkarni",
    role: "BCA 2nd Year — Symbiosis Pune",
    avatarInitials: "SK",
    avatarColor: "bg-purple-600 text-white",
    stars: 5,
    badge: "Landed first internship",
    categories: ["Got Internship", "College"],
    review: "I am from a BCA background and everyone told me tech companies only want B.Tech students. PathPilot matched me to 14 internships that actually wanted BCA students with my exact skill set. It also told me exactly why I was a 79 percent match for a UI/UX internship at a Bangalore startup and what I needed to do to get to 90 percent. I followed it, applied, and got in. The confidence this platform gives you is something no other app gives."
  },
  {
    id: "r4",
    name: "Rohit Verma",
    role: "B.Tech Mechanical, Final Year — NIT Nagpur",
    avatarInitials: "RV",
    avatarColor: "bg-emerald-600 text-white",
    stars: 5,
    badge: "Career switch to Data Analytics",
    categories: ["Career Switch", "College"],
    review: "I am a mechanical engineer who wanted to get into data analytics and everyone told me to just do a random Udemy course. PathPilot actually mapped my mechanical background to analytics roles and showed me I already had 60 percent of the skills transferable. Then it gave me a 10-week roadmap for the remaining 40 percent — Python, SQL, Tableau — with free resources. I followed it exactly and got placed in a data analyst role at a logistics company. This is what career guidance should have always looked like."
  },
  {
    id: "r5",
    name: "Aisha Khan",
    role: "B.Com 3rd Year — Delhi University",
    avatarInitials: "AK",
    avatarColor: "bg-amber-600 text-[#0F172A]",
    stars: 5,
    badge: "Got Finance Internship",
    categories: ["Got Internship", "College"],
    review: "I always thought platforms like this were only for tech students. PathPilot matched me to finance and accounting internships that actually fit my commerce background — not random software developer roles. The career coach helped me write a cover letter that actually talked about what I knew rather than apologising for what I did not. I got a finance internship at a CA firm in my second week on the platform. Honestly I wish I had found this in first year."
  },
  {
    id: "r6",
    name: "Karthik Rajan",
    role: "B.Tech IT, 2nd Year — Anna University Chennai",
    avatarInitials: "KR",
    avatarColor: "bg-indigo-600 text-white",
    stars: 4,
    badge: "Active user",
    categories: ["College"],
    review: "The mock interview feature is ridiculously good. I had my TCS campus interview last month and I used PathPilot's mock sessions for two weeks before it. The AI asks real questions, evaluates your answers with specific feedback, and tells you exactly where your response was too vague or too generic. I felt so much more prepared walking into the real interview. Did not get TCS but got Infosys — and I am sure the prep made the difference."
  },
  {
    id: "r7",
    name: "Meera Nair",
    role: "BSc Psychology Graduate — Kerala University",
    avatarInitials: "MN",
    avatarColor: "bg-pink-600 text-white",
    stars: 5,
    badge: "HR role at Byju's",
    categories: ["Got Job", "Graduate"],
    review: "Everyone told me psychology graduates have no future in corporate India. PathPilot showed me 23 HR and people-management roles that actively value psychology backgrounds. The AI even explained why my degree was an asset for HR roles — not a disadvantage. It helped me reframe my entire profile and write a LinkedIn summary that got me three recruiter messages in one week. Got my HR role at Byju's four months after graduating. I cried when I got the offer honestly."
  },
  {
    id: "r8",
    name: "Deepak Singh",
    role: "Diploma Engineering, Working Professional — Indore",
    avatarInitials: "DS",
    avatarColor: "bg-cyan-600 text-white",
    stars: 5,
    badge: "Promoted to Senior Technician",
    categories: ["Career Switch", "Graduate"],
    review: "I have a diploma, not a degree, and I always felt like platforms like this were not built for people like me. PathPilot matched me to technical roles where my actual experience and skills mattered more than my qualification. The skill gap report showed me two certifications that would make me much more competitive. I did them in three months and used the platform to find a better role. Got a 40 percent salary hike. This platform does not judge your background. It just works with what you have."
  },
  {
    id: "r9",
    name: "Tanvi Joshi",
    role: "B.Tech CS, 4th Year — BITS Pilani",
    avatarInitials: "TJ",
    avatarColor: "bg-purple-600 text-white",
    stars: 5,
    badge: "Google internship prep",
    categories: ["College", "School Student"],
    review: "Even as a BITS student with decent skills, the AI career coach found gaps in my profile I had completely missed. It told me my GitHub projects were not positioned well and that my resume was underselling three of my strongest experiences. The roadmap for system design preparation was better than any YouTube playlist I had tried. I am now preparing for Google internship applications with a much clearer head. The platform does not care what college you are from — it only looks at what you actually know and can do."
  },
  {
    id: "r10",
    name: "Vishal Patil",
    role: "MBA Marketing, 1st Year — Pune University",
    avatarInitials: "VP",
    avatarColor: "bg-emerald-600 text-white",
    stars: 4,
    badge: "Marketing internship secured",
    categories: ["Got Internship", "College"],
    review: "The opportunity matching is genuinely smart. I told PathPilot I wanted a digital marketing internship and it did not just dump 500 listings on me. It gave me 18 roles ranked by how well my profile matched each one, explained the match percentage, and told me which three were the best ones to apply to first. Got shortlisted for two of the three. The webinar on personal branding they hosted was also excellent — very practical, no fluff, real advice from people actually working in marketing."
  },
  {
    id: "r11",
    name: "Ritu Agarwal",
    role: "B.Tech ECE, Fresher — Tier 3 College, Jaipur",
    avatarInitials: "RA",
    avatarColor: "bg-amber-600 text-[#0F172A]",
    stars: 5,
    badge: "First job offer in 6 weeks",
    categories: ["Got Job", "Graduate"],
    review: "I graduated from a college nobody has heard of and I was convinced no good company would ever look at my profile. PathPilot did not treat my college as a filter. It looked at my skills, my projects, my certifications, and matched me to roles where I actually had a real shot. It also told me honestly that I needed to build two more projects to be competitive — so I did. Six weeks later I had my first job offer from an IoT startup in Jaipur. For someone from my background this felt like a miracle. But it was not magic — it was just finally having the right guidance."
  },
  {
    id: "r12",
    name: "Sahil Bhatt",
    role: "BBA Finance, Career Switcher — Ahmedabad",
    avatarInitials: "SB",
    avatarColor: "bg-pink-600 text-white",
    stars: 5,
    badge: "Switched to FinTech",
    categories: ["Career Switch", "Graduate"],
    review: "I spent two years in a job I hated because I did not know how to position my skills for a switch. PathPilot mapped my finance background and Excel skills to FinTech roles in 10 minutes and built me a transition roadmap I never would have figured out alone. The LinkedIn optimisation coach completely rewrote my headline and about section — I went from zero recruiter messages per month to getting four in the first week after updating my profile. Switched to a FinTech company within three months. PathPilot does not just find you a job. It repositions who you are."
  }
];

export default function Testimonials() {
  const landingReviews = reviewsData.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="testimonials-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#1e1e2e]/55 relative w-full">
      {/* Visual background glows */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-indigo-505/5 rounded-full blur-[100px] pointer-events-none select-none z-0"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none flex flex-col items-center">
        <span className="inline-flex items-center rounded-full bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 tracking-wider px-3.5 py-1 text-[10px] uppercase font-bold font-mono mb-4">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-black font-sora tracking-tight text-white mb-4">
          Real students. Real results.
        </h2>
        <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed max-w-2xl text-center">
          PathPilot users do not just find opportunities — they find the right ones. Here is what happened when students finally had a system working for them.
        </p>
      </div>

      {/* Masonry/Grid of Reviews */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
      >
        {landingReviews.map((review) => (
          <motion.div
            key={review.id}
            variants={itemVariants}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="bg-[#1E293B] border border-indigo-500/15 hover:border-indigo-500/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg relative group overflow-hidden"
          >
            {/* Top row: Badge Pill */}
            <div className="flex items-center justify-between gap-2 mb-4 select-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-[10px] font-semibold tracking-wider">
                <Trophy className="w-3 h-3 text-emerald-400 shrink-0" />
                {review.badge}
              </span>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.stars
                        ? "text-[#F59E0B] fill-[#F59E0B]"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Review text */}
            <p className="text-slate-300 text-xs leading-relaxed mb-6 flex-1 text-left relative z-10 select-text font-sans">
              "{review.review}"
            </p>

            {/* Outer accent divider */}
            <div className="h-[1px] bg-slate-800 my-4 opacity-50"></div>

            {/* Bottom Row: User Avatar & Info */}
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${review.avatarColor} flex items-center justify-center font-bold text-xs select-none shrink-0 border border-white/5`}>
                {review.avatarInitials}
              </div>
              <div className="text-left min-w-0">
                <h4 className="font-bold text-xs text-white truncate font-sora tracking-wide">
                  {review.name}
                </h4>
                <p className="text-[#94A3B8] text-[10px] truncate max-w-full font-sans mt-0.5">
                  {review.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Link redirecting to standalone Reviews Page */}
      <div className="text-center mt-12 select-none">
        <a
          href="/reviews"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6366F1] hover:text-indigo-400 transition-colors py-1 cursor-pointer font-sora select-none hover:underline"
        >
          View all 2,400+ reviews
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </section>
  );
}
