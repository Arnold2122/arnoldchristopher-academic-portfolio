import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BookOpen, Award, Code, Briefcase, Link as LinkIcon } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    publications: 0,
    certificates: 0,
    projects: 0,
    experience: 0,
    profiles: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      // If Supabase is not configured, fake stats for UI preview
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setStats({ publications: 2, certificates: 7, projects: 5, experience: 1, profiles: 9 });
        setLoading(false);
        return;
      }

      const [pubRes, certRes, projRes, expRes, profRes, recentProjectsRes, recentPubsRes] = await Promise.all([
        supabase.from('publications').select('id', { count: 'exact', head: true }),
        supabase.from('certificates').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('experience').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id, name, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('publications').select('id, title, created_at').order('created_at', { ascending: false }).limit(3)
      ]);

      setStats({
        publications: pubRes.count || 0,
        certificates: certRes.count || 0,
        projects: projRes.count || 0,
        experience: expRes.count || 0,
        profiles: profRes.count || 0,
      });

      // Combine and sort recent activity
      const activity = [];
      if (recentProjectsRes.data) {
        activity.push(...recentProjectsRes.data.map(p => ({ ...p, type: 'Project', title: p.name })));
      }
      if (recentPubsRes.data) {
        activity.push(...recentPubsRes.data.map(p => ({ ...p, type: 'Publication' })));
      }
      activity.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setRecentActivity(activity.slice(0, 5));
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Publications', value: stats.publications, icon: BookOpen },
    { label: 'Certificates', value: stats.certificates, icon: Award },
    { label: 'Projects', value: stats.projects, icon: Code },
    { label: 'Experience', value: stats.experience, icon: Briefcase },
    { label: 'Profiles', value: stats.profiles, icon: LinkIcon },
  ];

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-primary-text mb-6 uppercase tracking-wider">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-card border border-border p-6 rounded-xl flex items-center space-x-4 shadow-sm">
            <div className="p-3 bg-secondary-bg border border-border rounded-lg text-gold">
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-secondary-text text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-primary-text mt-1">
                {loading ? '...' : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-primary-text mb-4 uppercase tracking-wider border-b border-border pb-4">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-secondary-text bg-secondary-bg/50 rounded-lg border border-dashed border-border mt-2">
               <p>Welcome to the CMS Admin Dashboard.</p>
               <p className="text-sm mt-2">Navigate using the sidebar to manage your portfolio content.</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-secondary-bg rounded-lg transition-colors">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gold"></div>
                  <div>
                    <p className="font-medium text-primary-text">{activity.type} Added: <span className="font-serif">{activity.title}</span></p>
                    <p className="text-xs text-secondary-text mt-1">
                      {new Date(activity.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
