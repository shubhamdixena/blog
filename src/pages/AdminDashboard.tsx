import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminContentManager } from "@/components/admin/AdminContentManager";
import type { User } from '@supabase/supabase-js';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading user data...</div>;
  }

  return (
    <AdminLayout user={user}>
      <AdminContentManager />
    </AdminLayout>
  );
};

export default AdminDashboard;
