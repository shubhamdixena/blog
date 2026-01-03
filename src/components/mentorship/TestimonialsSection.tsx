
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    title: "Rhodes Scholar",
    details: "Computer Science PhD at Oxford\nResearching AI Ethics & Policy\nBased in San Francisco, USA",
    quote: "This mentorship completely transformed my academic journey. The personalized guidance helped me articulate my research vision in AI ethics in ways I never thought possible. From crafting compelling personal statements to preparing for interviews, every step was thoughtfully planned and executed.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332b93c?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Marcus Rodriguez",
    title: "Harvard MBA Scholar",
    details: "Former Tech Executive\nFocusing on Social Impact\nBased in Austin, Texas",
    quote: "The one-on-one approach made all the difference. Instead of generic advice, I received strategic guidance that highlighted my unique transition from tech to social entrepreneurship. The process was collaborative and felt like working with a trusted advisor.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Priya Sharma",
    title: "Gates Scholar",
    details: "Global Health Research\nCambridge University\nBased in Mumbai, India",
    quote: "Having someone who truly believed in my potential changed everything. The free mentorship program for disabled applicants isn't just about removing barriers. It's about genuine advocacy. This opened doors I never thought possible in global health research.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    title: "Fulbright Scholar",
    details: "Environmental Engineering\nStanford University PhD\nBased in Seoul, South Korea",
    quote: "The collaborative approach of drafting documents from scratch and refining them together saved me months of uncertainty. It felt like having a co-pilot for my dreams. Someone who understood the destination and knew how to navigate the complex application landscape.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Amanda Foster",
    title: "MIT PhD Recipient",
    details: "Sustainable Technology Research\nClean Energy Innovation\nBased in Boston, USA",
    quote: "This mentorship program represents genuine care and commitment to creating opportunities for everyone. The strategic guidance helped me secure not just admission, but full funding for my research in sustainable technology and clean energy solutions.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "James Thompson",
    title: "Oxford Scholar",
    details: "International Relations\nPolicy Research Focus\nBased in London, UK",
    quote: "The mentor fought for my success as much as I did, believing in my potential even when I doubted myself. This isn't just application assistance. It's genuine advocacy that changed the trajectory of my entire academic career in international relations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900">
            Student Success Stories
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Real transformations from students I've had the privilege to mentor
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Content */}
          <div>
            <Card className="border-slate-200 bg-white">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 mb-6 text-blue-600" />
                <blockquote className="text-lg leading-relaxed text-slate-900 mb-6">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-blue-100"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-base font-medium text-blue-600 mb-1">
                        {currentTestimonial.title}
                      </p>
                      <p className="whitespace-pre-line text-sm text-slate-500 leading-relaxed">
                        {currentTestimonial.details}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Navigation */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    index === currentIndex 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                  />
                  <h5 className={`text-sm font-medium ${
                    index === currentIndex ? 'text-blue-900' : 'text-slate-700'
                  }`}>
                    {testimonial.name}
                  </h5>
                  <p className={`text-xs ${
                    index === currentIndex ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {testimonial.title}
                  </p>
                </button>
              ))}
            </div>
            
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full h-2 ${
                    index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
