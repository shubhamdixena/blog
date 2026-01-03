import { Heart, Users, Target } from "lucide-react";

export function AccessibilitySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900">
            My Commitment to Accessibility
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Creating equal opportunities in higher education for everyone.
          </p>
        </div>

        {/* Main commitment */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-100">
          <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">
            Free Mentorship for Students with Disabilities
          </h3>
          <p className="text-lg text-slate-700 text-center leading-relaxed mb-4">
            <strong>All mentorship is always free for applicants with disabilities.</strong> No exceptions, no matter how many applications you need help with.
          </p>
          <p className="text-slate-600 text-center">
            This isn't just about removing financial barriers. It's about genuine advocacy and support.
          </p>
        </div>

        {/* Mission and stats */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-medium text-slate-900 mb-2">My Mission</h4>
            <p className="text-slate-600 leading-relaxed">
              Helping 200+ students with disabilities reach the world's leading institutions.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-lg font-medium text-slate-900 mb-2">Equal Opportunities</h4>
            <p className="text-slate-600 leading-relaxed">
              Creating pathways for talented individuals regardless of their circumstances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
