import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TravelNotes = () => {
  const travelEntries = [
    {
      location: "Singapore",
      country: "Southeast Asia",
      date: "December 2024",
      title: "The Architecture of Efficiency",
      excerpt: "Three weeks studying Singapore's urban planning revealed how thoughtful design can solve complex societal challenges. From hawker centers to public housing, efficiency isn't just aesthetic—it's cultural.",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&q=80",
      tags: ["Urban Planning", "Culture", "Innovation"]
    },
    {
      location: "Tokyo",
      country: "Japan",
      date: "November 2024",
      title: "Lessons from Konbini Culture",
      excerpt: "Japan's convenience stores aren't just retail—they're social infrastructure. How 7-Eleven became a masterclass in user experience and community building.",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop&q=80",
      tags: ["Retail", "UX Design", "Social Systems"]
    },
    {
      location: "Berlin",
      country: "Germany",
      date: "October 2024",
      title: "The Startup Paradox",
      excerpt: "Berlin's tech scene challenges Silicon Valley assumptions. Here, sustainable growth trumps hypergrowth, and work-life balance isn't a luxury—it's a competitive advantage.",
      image: "https://images.unsplash.com/photo-1559564484-0b8ea0e8b3d6?w=600&h=400&fit=crop&q=80",
      tags: ["Startups", "Culture", "Work Philosophy"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-slate-500" />
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
              Travel Notes
            </h2>
          </div>
        </div>

        {/* Travel Entries - Modern Minimal Grid */}
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {travelEntries.map((entry, index) => (
            <Card
              key={index}
              className="flex flex-col gap-4 p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer min-h-[120px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-slate-900/90 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {entry.location}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                  {entry.country}
                </span>
              </div>
              <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {entry.title}
              </div>
            </Card>
          ))}
        </div>

        {/* All Travel Notes Link */}
        <div className="text-center mt-16 pt-8">
          <Button
            variant="outline"
            className="border border-slate-200 hover:border-slate-900 text-slate-900 px-6 py-2 rounded-full text-sm font-medium bg-white"
          >
            View All Travel Notes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelNotes;
