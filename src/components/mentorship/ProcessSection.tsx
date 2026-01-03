import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PenTool, Heart, MessageSquare } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      icon: Users,
      title: "Personal Connection",
      description: "I treat every mentee as a friend, not just another application. We'll get to know each other first.",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: PenTool,
      title: "From Scratch Writing", 
      description: "I often write your essays from the ground up, then we refine them together until they truly represent you.",
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      icon: MessageSquare,
      title: "Open Communication",
      description: "No formal appointments or rigid schedules. Text me, call me, reach out whenever you need guidance.",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      icon: Heart,
      title: "Genuine Investment",
      description: "Your success matters to me personally. I'm not running a business—I'm building futures.",
      color: "bg-orange-50 text-orange-600 border-orange-200"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900">
            How I Work With You
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-600 mb-6">
            Applications are overwhelming—I get it. My approach is simple: treat you like a friend, 
            focus on what matters, and be there when you need me.
          </p>
          
          <div className="max-w-2xl mx-auto p-6 bg-slate-50 rounded-2xl">
            <p className="text-base leading-relaxed text-slate-700">
              <strong className="text-slate-900">I don't just edit your drafts.</strong> I often write them from scratch 
              based on our conversations, then we work together to make them authentically yours.
            </p>
          </div>
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${step.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-medium text-slate-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal Note */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <p className="text-slate-700 leading-relaxed">
                <strong className="text-slate-900">"I work alone by choice."</strong> You'll always work directly with me, 
                not assistants or team members. This keeps things personal and ensures I'm fully invested in your journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
