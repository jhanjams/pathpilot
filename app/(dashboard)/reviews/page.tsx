"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Star, Trophy, Search, RefreshCw, X } from "lucide-react";
import { Review, reviewsData } from "@/components/landing/Testimonials";

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayReviews, setDisplayReviews] = useState<Review[]>(reviewsData);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Rating breakdown stats
  const ratingsStats = [
    { stars: 5, percentage: 89 },
    { stars: 4, percentage: 8 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 }
  ];

  const filterTabs = [
    "All",
    "Got Internship",
    "Got Job",
    "Career Switch",
    "School Student",
    "College",
    "Graduate"
  ];

  // Filters and queries
  const processedReviews = useMemo(() => {
    return displayReviews.filter((review) => {
      // Search matching
      const matchesSearch =
        review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.role.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category matching
      if (activeFilter === "All") return true;

      return review.categories.some(
        (cat) => cat.toLowerCase() === activeFilter.toLowerCase()
      );
    });
  }, [displayReviews, activeFilter, searchQuery]);

  // Handle mock reload/shuffle
  const handleLoadMore = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Re-shuffle reviews array randomly for interactive mock feedback
      const shuffled = [...displayReviews].sort(() => Math.random() - 0.5);
      setDisplayReviews(shuffled);
      setIsRefreshing(false);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 14
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#FAFAFA] font-sans relative overflow-hidden pb-24">
      {/* Background radial spotlights */}
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] left-[25%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-20">
        
        {/* ==========================================
            1. PAGE HEADER
            ========================================== */}
        <header className="max-w-3xl mx-auto text-center mt-8 mb-16 select-none flex flex-col items-center">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 text-[#a78bfa] border border-indigo-500/20 tracking-widest px-3.5 py-1 text-[10px] uppercase font-bold font-mono mb-4">
            PathPilot Reviews
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-sora tracking-tight text-white mb-4">
            What PathPilot users are saying
          </h1>
          <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed max-w-2xl text-center">
            Discover real success stories and feedback from engineering, commerce, arts, and management students across India who unlocked their career directions.
          </p>
        </header>

        {/* ==========================================
            2. RATING ANALYTICS HERO DASHBOARD
            ========================================== */}
        <section className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 lg:p-8 mb-12 select-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          {/* Main Average metric */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center lg:border-r lg:border-slate-800 lg:pr-8 py-4">
            <span className="text-6xl sm:text-7xl font-black font-sora text-white leading-none">
              4.9
            </span>
            
            {/* 5 star graphic */}
            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]"
                />
              ))}
            </div>
            
            <p className="text-xs text-[#94A3B8] font-semibold mt-3">
              Based on 2,400+ verified student reviews
            </p>
          </div>

          {/* Rating progress breakdown bars */}
          <div className="lg:col-span-8 space-y-3.5">
            <h3 className="text-xs font-bold font-sora uppercase tracking-widest text-indigo-400 mb-2">
              Rating Breakdown
            </h3>
            
            {ratingsStats.map((stat) => (
              <div key={stat.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-right text-slate-300 font-semibold flex items-center justify-end gap-1">
                  {stat.stars} <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] shrink-0 inline" />
                </span>
                
                {/* Track bar progress background */}
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-750">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>

                <span className="w-10 text-right font-bold text-slate-400">
                  {stat.percentage}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            3. SEARCH & CONTROLS SECTION
            ========================================== */}
        <section className="mb-10 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Input query field */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search reviews by name, college, matching role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e293b]/70 border border-slate-800 focus:border-indigo-500 rounded-xl px-11 py-3 text-xs placeholder-slate-500 text-white outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Micro active status */}
            <div className="text-right text-2xs text-[#94A3B8] select-none">
              Showing <span className="text-white font-bold">{processedReviews.length}</span> of {displayReviews.length} detailed accounts
            </div>
          </div>

          {/* Interactive filter list segment */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide select-none -mx-6 px-6 lg:mx-0 lg:px-0">
            {filterTabs.map((tab) => {
              const isActive = activeFilter.toLowerCase() === tab.toLowerCase();
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-all border ${
                    isActive
                      ? "bg-indigo-600/15 text-indigo-400 border-indigo-500/30 font-bold"
                      : "bg-[#1E293B]/50 border-slate-800 text-[#94A3B8] hover:text-white hover:border-slate-700"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            4. DYNAMIC REVIEWS MASONRY / CARD LIST
            ========================================== */}
        {processedReviews.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${activeFilter}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
          >
            {processedReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-[#1E293B] border border-indigo-500/15 hover:border-indigo-500/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg relative h-full"
              >
                <div>
                  {/* Badge & Stars Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 select-none">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-[9px] font-bold tracking-wider">
                      <Trophy className="w-3 h-3 text-emerald-400 inline" />
                      {review.badge}
                    </span>
                    
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3 h-3 ${
                            idx < review.stars
                              ? "text-[#F59E0B] fill-[#F59E0B]"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Body text paragraph */}
                  <p className="text-slate-300 text-xs leading-relaxed text-left font-sans select-text relative z-10 mb-6">
                    "{review.review}"
                  </p>
                </div>

                {/* Info divider section */}
                <div>
                  <div className="h-[1px] bg-slate-800/80 mb-4" />
                  
                  {/* Avatar + Credentials footer */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${review.avatarColor} flex items-center justify-center font-bold text-xs shrink-0 border border-white/5`}>
                      {review.avatarInitials}
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="font-bold text-xs text-white truncate font-sora">
                        {review.name}
                      </h4>
                      <p className="text-[#94A3B8] text-[9px] truncate max-w-full font-sans mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 select-none">
            <div className="w-12 h-12 bg-slate-800/60 border border-slate-700 text-slate-400 rounded-full flex items-center justify-center text-lg mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5 font-sora">
              No matching accounts found
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md mx-auto">
              We couldn't find any verified credentials matching "{searchQuery}". Try modifying your query or selecting another filter.
            </p>
          </div>
        )}

        {/* ==========================================
            5. PAGE ACTION FOOTER (LOAD MORE MOCK)
            ========================================== */}
        <div className="text-center mt-16 select-none">
          <button
            type="button"
            disabled={isRefreshing}
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-sora cursor-pointer shadow-md tracking-wider transition-all duration-200"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 shrink-0 animate-spin" />
                Shuffling Review Database...
              </>
            ) : (
              <>
                Load more reviews
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
