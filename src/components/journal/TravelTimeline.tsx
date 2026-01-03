import { MapPin, Calendar, Camera, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TravelTimeline = () => {
  const travelExperiences = [
    {
      id: 1,
      location: "Singapore",
      country: "Singapore",
      date: "December 2024",
      duration: "2 weeks",
      purpose: "Fintech Conference & Startup Research",
      highlights: [
        "Spoke at Asia Fintech Summit",
        "Visited 12 local startups",
        "Explored hawker center culture"
      ],
      images: [
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop&q=80"
      ],
      relatedArticles: [
        "Singapore's Startup Ecosystem: A Masterclass in Government Support",
        "Food Courts as Community Hubs: Lessons from Singapore"
      ],
      status: "completed"
    },
    {
      id: 2,
      location: "Ho Chi Minh City",
      country: "Vietnam",
      date: "November 2024",
      duration: "3 weeks",
      purpose: "E-commerce Market Research",
      highlights: [
        "Interviewed 50+ local entrepreneurs",
        "Studied mobile payment adoption",
        "Documented street food innovation"
      ],
      images: [
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1559592413-7cec4d0cdb8e?w=400&h=300&fit=crop&q=80"
      ],
      relatedArticles: [
        "Vietnam's E-commerce Revolution: Beyond the Headlines",
        "Motorbike Culture and Urban Innovation"
      ],
      status: "completed"
    },
    {
      id: 3,
      location: "Bali",
      country: "Indonesia",
      date: "October 2024",
      duration: "1 month",
      purpose: "Digital Nomad Research & Writing Retreat",
      highlights: [
        "Co-working space ethnography",
        "Remote work culture study",
        "Completed 15,000-word report"
      ],
      images: [
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop&q=80"
      ],
      relatedArticles: [
        "The Digital Nomad Paradox: Freedom vs. Community",
        "Canggu's Co-working Revolution"
      ],
      status: "completed"
    },
    {
      id: 4,
      location: "Dubai",
      country: "UAE",
      date: "March 2025",
      duration: "10 days",
      purpose: "Web3 Conference & Innovation Summit",
      highlights: [
        "Keynote at GITEX Future Stars",
        "Blockchain startup acceleration program",
        "Cultural immersion experience"
      ],
      images: [],
      relatedArticles: [],
      status: "upcoming"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            Travel & Research
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Journey Timeline
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Documenting experiences, research, and insights from travels around the world. 
            Each trip is an opportunity to learn, connect, and understand different perspectives on innovation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-400 hidden lg:block" />

          <div className="space-y-12">
            {travelExperiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-white border-4 border-emerald-400 rounded-full hidden lg:block" 
                     style={{ top: '2rem' }} />

                <Card className="lg:ml-16 overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Images Section */}
                    <div className="relative h-64 lg:h-full">
                      {experience.images.length > 0 ? (
                        <div className="grid grid-cols-2 h-full gap-0">
                          {experience.images.slice(0, 2).map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={image}
                              alt={`${experience.location} ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">Photos coming soon</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge 
                          className={
                            experience.status === 'completed' 
                              ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }
                        >
                          {experience.status === 'completed' ? 'Completed' : 'Upcoming'}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="lg:col-span-2 p-8">
                      <div className="space-y-6">
                        {/* Location & Date */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                              {experience.location}
                            </h3>
                            <p className="text-slate-600 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {experience.country}
                            </p>
                          </div>
                          <div className="flex flex-col lg:items-end gap-2">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Calendar className="w-4 h-4" />
                              {experience.date}
                            </div>
                            <Badge variant="outline" className="w-fit">
                              {experience.duration}
                            </Badge>
                          </div>
                        </div>

                        {/* Purpose */}
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Purpose</h4>
                          <p className="text-slate-600">{experience.purpose}</p>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-medium text-slate-900 mb-3">Key Highlights</h4>
                          <ul className="space-y-2">
                            {experience.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-start gap-2 text-slate-600">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Related Articles */}
                        {experience.relatedArticles.length > 0 && (
                          <div>
                            <h4 className="font-medium text-slate-900 mb-3">Related Articles</h4>
                            <div className="space-y-2">
                              {experience.relatedArticles.map((article, articleIndex) => (
                                <Button
                                  key={articleIndex}
                                  variant="ghost"
                                  className="justify-start h-auto p-0 text-left text-blue-600 hover:text-blue-800 hover:bg-transparent"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{article}</span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Follow My Journey
            </h3>
            <p className="text-slate-600 mb-6">
              Get notified when I publish new insights from my travels and research expeditions.
            </p>
            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-2xl text-lg font-medium"
            >
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTimeline;
