import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FieldNotes = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Full Width Background with Content */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg cursor-pointer group">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80"
              alt="Featured Articles Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-purple-600/30 to-pink-500/40"></div>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 flex items-center justify-start h-full px-12">
            {/* Field Notes Card */}
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md transform group-hover:scale-105 transition-transform duration-300">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-4">
                FEATURED ARTICLES
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 leading-tight">
                The world needs more Nick Kristofs
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                I loved this journalist's story of chasing hard problems and holding onto hope.
              </p>
              <Button 
                variant="ghost" 
                className="text-slate-900 hover:text-slate-700 p-0 h-auto font-medium group"
              >
                Read Full Note
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Book Cover - Positioned on the right */}
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&q=80"
              alt="Chasing Hope: A Reporter's Life by Nicholas D. Kristof"
              className="w-48 h-64 object-cover shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button 
            variant="ghost"
            className="text-slate-900 hover:text-slate-700 font-medium group"
          >
            View All Field Notes
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FieldNotes;
