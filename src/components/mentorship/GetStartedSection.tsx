import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function GetStartedSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900">
          How We'll Work Together
        </h2>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 text-slate-600">
          No tickets, no rigid appointments. Just reach out when you're ready. We work on mutual trust and understanding.
        </p>
        
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-700 leading-relaxed">
            Call or message when you need to. Within reason, I'll always get back to you as soon as I can. 
            This isn't a business transaction. It's about helping you succeed.
          </p>
        </div>
      </div>
    </section>
  );
}
