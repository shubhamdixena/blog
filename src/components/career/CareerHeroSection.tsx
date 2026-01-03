import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CareerHeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
            Career Guidance
            <br />
            <span className="text-blue-600">for Students</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your strengths, explore career paths, and build the skills that matter. 
            From high school to college and beyond—your career journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
            >
              Take Career Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-slate-300 hover:border-slate-900 text-slate-900 px-8 py-3 rounded-full"
            >
              Explore Career Paths
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
