import { lazy, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrepTalkSection from "@/components/PrepTalkSection";

// Import hero section directly for better performance
import JournalHeroSection from '@/components/journal/JournalHeroSection';

// Lazy load other components
const RecentReads = lazy(() => import('@/components/journal/RecentReads'));
const FieldNotes = lazy(() => import('@/components/journal/FieldNotes'));
const CurrentFocus = lazy(() => import('@/components/journal/CurrentFocus'));
// Removed TravelNotes from homepage ordering per layout cleanup
const NewsletterSection = lazy(() => import('@/components/journal/NewsletterSection'));

const LoadingFallback = () => (
  <div className="animate-pulse bg-gradient-to-r from-slate-100 to-slate-200 h-96 rounded-lg mx-6 my-8"></div>
);

const JournalIndex = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <JournalHeroSection />

        {/* Innovation Spotlight */}
        <PrepTalkSection />

        {/* Recent Articles */}
        <Suspense fallback={<LoadingFallback />}>
          <RecentReads />
        </Suspense>

        {/* Featured Articles (formerly Field Notes) */}
        <Suspense fallback={<LoadingFallback />}>
          <FieldNotes />
        </Suspense>

        {/* Current Focus */}
        <Suspense fallback={<LoadingFallback />}>
          <CurrentFocus />
        </Suspense>
        
        {/* Journal Overview: Categories (moved to bottom) */}
        <Suspense fallback={<LoadingFallback />}>
          
        </Suspense>
        
        {/* Newsletter Section */}
        <Suspense fallback={<LoadingFallback />}>
          <NewsletterSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default JournalIndex;
