import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Brain, Users, Lightbulb, Target } from "lucide-react";

export function SkillsAssessmentSection() {
  const skillCategories = [
    {
      icon: Brain,
      title: "Analytical Skills",
      description: "Problem-solving, critical thinking, and data analysis",
      skills: ["Problem Solving", "Data Analysis", "Critical Thinking", "Research"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "People Skills",
      description: "Communication, leadership, and teamwork abilities",
      skills: ["Communication", "Leadership", "Teamwork", "Empathy"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Lightbulb,
      title: "Creative Skills",
      description: "Innovation, design thinking, and artistic abilities",
      skills: ["Creativity", "Design", "Innovation", "Artistic Expression"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Target,
      title: "Technical Skills",
      description: "Technology, programming, and technical expertise",
      skills: ["Programming", "Technology", "Engineering", "Digital Literacy"],
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const assessmentQuestions = [
    "What subjects do you enjoy most in school?",
    "What activities make you lose track of time?",
    "Do you prefer working alone or in teams?",
    "Are you more drawn to creative or analytical tasks?",
    "What kind of problems do you like solving?"
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Discover Your Strengths
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take our skills assessment to understand your natural abilities and find careers that match your strengths.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-slate-900 mb-6">Key Skill Areas</h3>
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-slate-900">
                          {category.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-slate-600 mb-3">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Assessment Preview */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-slate-900 mb-6">Assessment Preview</h3>
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-900">
                  Career Compatibility Assessment
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Answer a few questions to get personalized career recommendations.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {assessmentQuestions.slice(0, 3).map((question, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm text-slate-700">{question}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs">
                      +
                    </div>
                    <p className="text-sm text-slate-500">And 12 more questions...</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Completion Time</span>
                    <span className="text-sm font-medium text-slate-900">~10 minutes</span>
                  </div>
                  <Progress value={0} className="mb-4" />
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-green-900 mb-2">Get Personalized Results</h4>
                  <p className="text-sm text-green-700">
                    Receive a detailed report with career matches based on your unique strengths and interests.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
