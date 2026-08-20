import { useEffect, useState } from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { supabase, hasSupabaseConfig } from '../../lib/supabase';
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Award, 
  Code, 
  Link as LinkIcon, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard | Mr. A. Arnold Christopher";
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Protect all admin routes - if no session, force login
  if (!session) {
    return <Navigate to="/?login=true" replace />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'About Me', path: '/admin/about', icon: User },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Publications', path: '/admin/publications', icon: BookOpen },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Projects', path: '/admin/projects', icon: Code },
    { name: 'Profiles', path: '/admin/profiles', icon: LinkIcon },
  ];

  return (
    <div className="h-screen bg-primary-bg flex flex-col md:flex-row text-primary-text font-sans overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden relative z-50 flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-gold" size={20} />
          <h1 className="font-serif text-lg font-bold text-primary-text tracking-widest uppercase">Admin Panel</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed md:static inset-0 z-40 bg-card border-r border-border md:w-64 flex flex-col transition-transform transform shadow-sm",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 hidden md:block">
          <div className="flex items-center space-x-3">
            <GraduationCap className="text-gold" size={24} />
            <h1 className="font-serif text-xl font-bold text-primary-text tracking-widest uppercase">Admin Panel</h1>
          </div>
          <div className="w-12 h-1 bg-gold mt-3"></div>
        </div>

        <nav className="flex-1 px-4 py-8 md:py-4 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
                isActive 
                  ? "bg-gold/10 text-gold border border-gold/20" 
                  : "text-secondary-text hover:bg-secondary-bg hover:text-primary-text"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-secondary-text hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-primary-bg">
        <div className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
           {/* If Supabase is missing, show a big warning on all admin pages */}
           {!hasSupabaseConfig && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 text-red-800 shadow-sm">
                <h3 className="font-bold mb-2">Supabase Credentials Missing</h3>
                <p className="text-sm">Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable CMS functionality.</p>
              </div>
           )}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
