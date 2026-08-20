import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { profile as fallbackProfile } from '../data/profile';

// We reuse the type of the exported static profile
export type PortfolioData = typeof fallbackProfile;

const PortfolioContext = createContext<PortfolioData | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // If Supabase is not configured, just use the fallback static data.
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.log("Supabase not configured, using static profile data.");
        setData(fallbackProfile);
        return;
      }

      try {
        // Fetch all published data in parallel
        const [
          { data: about },
          { data: education },
          { data: experience },
          { data: publications },
          { data: projects },
          { data: certificates },
          { data: profiles }
        ] = await Promise.all([
          supabase.from('about').select('*').limit(1).single(),
          supabase.from('education').select('*').eq('is_published', true).order('created_at', { ascending: false }),
          supabase.from('experience').select('*').eq('is_published', true).order('created_at', { ascending: false }),
          supabase.from('publications').select('*').eq('is_published', true).order('created_at', { ascending: false }),
          supabase.from('projects').select('*').eq('is_published', true).order('created_at', { ascending: false }),
          supabase.from('certificates').select('*').eq('is_published', true).order('created_at', { ascending: false }),
          supabase.from('profiles').select('*').eq('is_published', true).order('created_at', { ascending: false })
        ]);

        if (!about) {
           // Database is empty or uninitialized, use fallback
           setData(fallbackProfile);
           return;
        }

        // Map DB profiles to the nested object structure expected by the frontend
        const mappedProfiles: any = { ...fallbackProfile.profiles };
        if (profiles && profiles.length > 0) {
          profiles.forEach(p => {
            const key = p.platform.toLowerCase().replace(/_([a-z])/g, (g: string) => g[1].toUpperCase());
            
            const existingProfile = mappedProfiles[key] || {};
            
            mappedProfiles[key] = {
              ...existingProfile,
              url: p.profile_url,
              text: p.display_name
            };
          });
        }

        const mergedProfile: PortfolioData = {
          name: about.name || fallbackProfile.name,
          designation: about.designation || fallbackProfile.designation,
          department: about.department || fallbackProfile.department,
          institution: about.institution || fallbackProfile.institution,
          institutionWebsite: about.institution_website || fallbackProfile.institutionWebsite,
          location: about.location || fallbackProfile.location,
          aboutLocation: about.about_location || fallbackProfile.aboutLocation,
          degree: about.degree || fallbackProfile.degree,
          email: about.email || fallbackProfile.email,
          photo: about.photo_url || fallbackProfile.photo,
          aboutShort: about.about_short || fallbackProfile.aboutShort,
          cgpa: about.cgpa || fallbackProfile.cgpa,
          educationSubtitle: about.education_subtitle || fallbackProfile.educationSubtitle,
          
          metrics: {
            publications: publications?.length.toString() || fallbackProfile.metrics.publications,
            bookChapters: publications?.filter(p => p.publication_type && p.publication_type.includes('Book Chapter')).length.toString() || fallbackProfile.metrics.bookChapters,
            projects: projects?.length.toString() || fallbackProfile.metrics.projects,
          },

          education: education && education.length > 0 ? education.map(e => ({
            degree: e.degree,
            field: e.field,
            institution: e.institution,
            institutionUrl: e.institution_url,
            startYear: e.start_year,
            endYear: e.end_year,
            location: e.location,
            status: e.status,
            description: e.description
          })) : fallbackProfile.education,

          experience: experience && experience.length > 0 ? experience.map(e => ({
            role: e.role,
            organisation: e.organisation,
            startYear: e.start_year,
            endYear: e.end_year,
            location: e.location,
            type: e.type,
            description: e.description,
            responsibilities: e.responsibilities,
            technologies: e.technologies,
            certificateUrl: e.certificate_url
          })) : fallbackProfile.experience,

          publications: publications && publications.length > 0 ? publications.map(p => ({
            type: p.publication_type,
            status: p.status || 'Published',
            year: p.year,
            title: p.title,
            authors: p.authors || '',
            container: p.publisher || '', // keep for legacy compatibility if needed
            publisher: p.publisher || '',
            summary: p.summary || '',
            doi: p.doi || '',
            isbn: p.isbn || '',
            url: p.publication_url || '',
            bookTitle: p.book_name,
            bookUrl: p.book_url,
            indexing: p.indexing === 'None' ? '' : (p.indexing || ''),
            category: p.publication_type as any
          })) : fallbackProfile.publications,

          projects: projects && projects.length > 0 ? projects.map(p => ({
            name: p.name,
            category: p.category || "Project",
            description: p.short_description || p.description || "",
            problem: p.problem || "",
            solution: p.detailed_description || p.solution || "",
            technologies: p.technology_stack || p.technologies || [],
            status: p.status || "Completed",
            githubUrl: p.github_url || "",
            liveUrl: p.live_demo_url || p.live_url || "",
            image: p.image_url || "",
            featured: p.is_featured ?? false
          })) : fallbackProfile.projects,

          certificates: certificates && certificates.length > 0 ? certificates.map(c => ({
            title: c.title,
            issuer: c.issuer,
            year: c.year,
            file: c.file_url,
            issuerUrl: c.issuer_url
          })) : fallbackProfile.certificates,

          researchAreas: fallbackProfile.researchAreas,
          publicationSubtitle: fallbackProfile.publicationSubtitle,

          profiles: mappedProfiles
        };

        setData(mergedProfile);

      } catch (error) {
        console.error("Error fetching portfolio data from Supabase, using fallback:", error);
        setData(fallbackProfile);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1221] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
