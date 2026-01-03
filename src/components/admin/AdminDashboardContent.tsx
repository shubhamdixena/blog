import React from "react";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp, MessageSquare, BookOpen, Eye, Clock, Calendar, Video, MapPin } from "lucide-react";

const AdminDashboardContent = () => {
  return (
    <div className="space-y-8">
      {/* Upcoming Sessions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light text-slate-900">Upcoming Sessions</h2>
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Sessions */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Today's Sessions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Video className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Career Transition Guidance</p>
                    <p className="text-xs text-slate-600">Alex Chen - Frontend to Full-stack</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      Zoom Meeting
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">2:00 PM</p>
                  <p className="text-xs text-slate-600">60 min</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Group Career Workshop</p>
                    <p className="text-xs text-slate-600">Resume Review & Interview Prep</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      Google Meet
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">4:30 PM</p>
                  <p className="text-xs text-slate-600">90 min</p>
                </div>
              </div>
            </div>
          </Card>

          {/* This Week */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              This Week
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-900">Technical Interview Prep</p>
                  <p className="text-xs text-slate-600">Maria Rodriguez - Data Science</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Tomorrow</p>
                  <p className="text-xs text-slate-500">10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-900">Career Strategy Session</p>
                  <p className="text-xs text-slate-600">David Kim - Product Management</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Friday</p>
                  <p className="text-xs text-slate-500">3:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-900">Networking Workshop</p>
                  <p className="text-xs text-slate-600">Group Session - 8 participants</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Saturday</p>
                  <p className="text-xs text-slate-500">11:00 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Traffic Metrics */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Monthly Visitors</p>
              <p className="text-2xl font-semibold text-slate-900">2,847</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Page Views</p>
              <p className="text-2xl font-semibold text-slate-900">8,234</p>
              <p className="text-sm text-green-600 mt-1">+18% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Avg. Session Duration</p>
              <p className="text-2xl font-semibold text-slate-900">4m 32s</p>
              <p className="text-sm text-blue-600 mt-1">+8% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Mentorship Metrics */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Mentorship Inquiries</p>
              <p className="text-2xl font-semibold text-slate-900">23</p>
              <p className="text-sm text-green-600 mt-1">+5 this month</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Career Guide Views</p>
              <p className="text-2xl font-semibold text-slate-900">1,456</p>
              <p className="text-sm text-green-600 mt-1">+25% this month</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Engagement Rate</p>
              <p className="text-2xl font-semibold text-slate-900">68%</p>
              <p className="text-sm text-blue-600 mt-1">Above industry avg</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900">Recent Activity</h3>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New mentorship inquiry</p>
                  <p className="text-xs text-slate-600">Sarah Johnson - Software Engineering Career</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">2 hours ago</p>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Career guide highly viewed</p>
                  <p className="text-xs text-slate-600">"Breaking into Tech" - 234 views today</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">6 hours ago</p>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">High engagement post</p>
                  <p className="text-xs text-slate-600">"Mentorship Best Practices" - 89% engagement</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">1 day ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardContent;