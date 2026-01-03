import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, Users, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function MentorshipHero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
            Personal Mentorship
            <br />
            <span className="text-blue-600">for Your Academic Journey</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            I'm here to guide you through MBA, Master's, PhD, fellowship, and scholarship applications. 
            One-on-one support from someone who genuinely cares about your success.
          </p>

          <div className="flex justify-center mb-8">
            <Link to="/mentorship/apply">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
              >
                Apply for Mentorship
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Key Features - Single Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-600" />
              <strong>Focus on maximum 3 applications for quality support</strong>
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <strong>Personalized one-on-one mentorship approach</strong>
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <strong>Flexible scheduling that works with your timeline</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
