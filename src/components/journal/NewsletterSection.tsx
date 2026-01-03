import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 text-center">
        {/* Simple Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Get notified when I publish new entries. No spam, just thoughtful writing delivered to your inbox.
        </p>

        {/* Email Form */}
        <div className="max-w-md mx-auto">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-white/40 focus:ring-white/20 rounded-none"
            />
            <Button 
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-none font-medium px-6 group"
            >
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-slate-400 mt-6">
          Unsubscribe anytime. Read the <a href="#" className="underline hover:text-slate-300">privacy policy</a>.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
