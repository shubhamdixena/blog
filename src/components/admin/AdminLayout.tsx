
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  LogOut,
  User as UserIcon,
  PenTool,
  Globe,
  UserCheck
} from "lucide-react";
import type { User } from '@supabase/supabase-js';

interface AdminLayoutProps {
  children: React.ReactNode;
  user: User;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "dashboard"
  },
  {
    title: "Posts",
    icon: FileText,
    path: "posts"
  },
  {
    title: "Mentorship",
    icon: UserCheck,
    path: "mentorship"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "settings"
  }
];

export const AdminLayout = ({ children, user }: AdminLayoutProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <aside className="w-16 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
          <div className="p-3 border-b border-slate-200">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <nav className="flex-1 p-3">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => setActiveTab(item.path)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative ${
                    activeTab === item.path 
                      ? "bg-blue-100 text-blue-600" 
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                  title={item.title}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </nav>
          
          <div className="p-3 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 group relative"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                Sign Out
              </span>
            </button>
          </div>
        </aside>

        <main className="flex-1 ml-16">
          <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-5">
            <div>
              <h1 className="text-2xl font-light text-slate-900">
                {activeTab === "dashboard" ? "Dashboard" : 
                 activeTab === "posts" ? "Posts" :
                 activeTab === "mentorship" ? "Mentorship Submissions" :
                 activeTab === "settings" ? "Settings" :
                 "Dashboard"}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {activeTab === "dashboard" ? "Content overview and analytics" : 
                 activeTab === "posts" ? "Create and manage your blog posts" :
                 activeTab === "mentorship" ? "View and manage mentorship applications" :
                 activeTab === "settings" ? "Configure your site settings" :
                 "Manage your blog"}
              </p>
            </div>
          </header>
          
          <div className="p-6">
            {React.cloneElement(children as React.ReactElement, { activeTab })}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
