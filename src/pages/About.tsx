
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MediaMentions } from "@/components/MediaMentions";
import ProjectsSection from "@/components/ProjectsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, Twitter, Award, Users, BookOpen, Heart } from "lucide-react";

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts (fixes auto-scrolling issue)
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    "Artificial Intelligence", "Healthcare Technology", "Climate Solutions", 
    "Educational Innovation", "Global Health", "Policy Analysis", 
    "Technology Ethics", "Sustainable Development"
  ];

  const achievements = [
    {
      year: "2024",
      title: "Healthcare Innovation Award",
      organization: "Global Health Council"
    },
    {
      year: "2023",
      title: "Young Leader in Technology",
      organization: "World Economic Forum"
    },
    {
      year: "2023",
      title: "Climate Tech Advocate",
      organization: "UN Climate Change"
    },
    {
      year: "2022",
      title: "Education Excellence Recognition",
      organization: "UNESCO"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Introduction */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 leading-tight">
              Hello, I'm
              <span className="block text-blue-600">Shubham</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              I explore the intersection of technology, society, and human progress through thoughtful writing and research. My work bridges the gap between cutting-edge innovation and practical solutions that can improve lives worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              <Button variant="outline" size="sm" className="rounded-full">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="text-8xl text-blue-600/60 font-light">SD</div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-2xl opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-600 rounded-xl opacity-20"></div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-slate-900 mb-8">My Story</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                My journey began with a simple belief: technology should serve humanity, not the other way around. Through my writing and research, I've dedicated myself to exploring how we can harness innovation to solve our most pressing challenges.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                From artificial intelligence in healthcare to climate technology solutions, I focus on the intersection where cutting-edge research meets real-world impact. My work has been recognized globally, but what drives me most is the potential to improve lives through thoughtful analysis and ethical innovation.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-slate-900 mb-2">Focus Areas</h3>
                <p className="text-sm text-slate-600">AI & Healthcare, Global Health, Climate Tech, Education</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-slate-900 mb-2">Recognition</h3>
                <p className="text-sm text-slate-600">Global Health Council, World Economic Forum, UNESCO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Milestones */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-slate-900 mb-12">Journey Milestones</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
                    {achievement.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{achievement.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I Write About */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-slate-900 mb-8">What I Write About</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {skills.slice(0, 6).map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 leading-relaxed">
            I focus on making complex topics accessible while maintaining intellectual rigor. Every piece aims to bridge theoretical possibilities with practical implementations, always considering the human impact of technological advancement.
          </p>
        </div>

        {/* Recent Highlights */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-slate-900 mb-12">Recent Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="group">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                <a href="/article/ai-healthcare-transformation">
                  How AI Will Transform Healthcare in the Next Decade
                </a>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Exploring how machine learning is revolutionizing medical diagnosis and treatment, and what to expect next.
              </p>
            </article>
            
            <article className="group">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                <a href="/article/global-health-inequity">
                  Global Health Inequity: A Call to Action
                </a>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Addressing massive healthcare disparities and building more equitable health systems worldwide.
              </p>
            </article>
            
            <article className="group">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                <a href="/article/ai-ethics">
                  The Ethics of Artificial Intelligence
                </a>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Building robust frameworks to ensure AI serves humanity's best interests rather than causing harm.
              </p>
            </article>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center py-12 border-t border-slate-200">
          <h2 className="text-2xl font-light text-slate-900 mb-4">Let's Connect</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Interested in collaborating, discussing ideas, or learning more about my work? 
            I'm always open to meaningful conversations about technology, innovation, and social impact.
          </p>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
          >
            Start a Conversation
            <Mail className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
