import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { profile } from '../data/profile';
import { resolve } from 'path';
import ws from 'ws';

// Load env vars
dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
});

async function migrateData() {
  console.log('Starting data migration...');

  try {
    // 1. Profile / Settings
    const profileSettings = {
      name: profile.name,
      designation: profile.designation,
      department: profile.department,
      institution: profile.institution,
      institution_website: profile.institutionWebsite,
      location: profile.location,
      about_location: profile.aboutLocation,
      degree: profile.degree,
      email: profile.email,
      photo_url: profile.photo,
      about_short: profile.aboutShort,
      cgpa: profile.cgpa
    };
    
    console.log('Migrating About...');
    const { error: settingsError } = await supabase.from('about').upsert({ id: '1', ...profileSettings });
    if (settingsError) console.error('About Error:', settingsError);

    console.log('Migrating Education...');
    for (const ed of profile.education) {
      const { error } = await supabase.from('education').insert({
        degree: ed.degree,
        institution: ed.institution,
        start_year: ed.startYear || '',
        end_year: ed.endYear || '',
        status: ed.status,
        is_published: true
      });
      if (error) console.error('Education Error:', error);
    }

    // 3. Experience
    console.log('Migrating Experience...');
    for (const exp of profile.experience) {
      const { error } = await supabase.from('experience').insert({
        role: exp.role,
        organisation: exp.organisation,
        start_year: exp.startYear,
        end_year: exp.endYear,
        location: exp.location,
        type: exp.type,
        description: exp.description,
        responsibilities: exp.responsibilities,
        technologies: exp.technologies,
        certificate_url: exp.certificateUrl,
        is_published: true
      });
      if (error) console.error('Experience Error:', error);
    }

    // 4. Publications
    console.log('Migrating Publications...');
    for (const pub of profile.publications) {
      const { error } = await supabase.from('publications').insert({
        title: pub.title,
        authors: pub.authors || 'Arnold Christopher A',
        publication_type: pub.container ? 'Journal Article' : 'Other',
        publisher: pub.container,
        year: pub.year || '2026',
        doi: pub.doi,
        publication_url: pub.url,
        is_published: true
      });
      if (error) console.error('Publication Error:', error);
    }

    // 5. Projects
    console.log('Migrating Projects...');
    for (const proj of profile.projects) {
      const { error } = await supabase.from('projects').insert({
        name: proj.name,
        short_description: proj.description,
        detailed_description: proj.solution,
        technology_stack: proj.technologies,
        github_url: proj.githubUrl,
        live_demo_url: proj.liveUrl,
        image_url: proj.image,
        is_published: true
      });
      if (error) console.error('Project Error:', error);
    }

    // 6. Certificates
    console.log('Migrating Certificates...');
    for (const cert of profile.certificates) {
      const { error } = await supabase.from('certificates').insert({
        title: cert.title,
        issuer: cert.issuer,
        year: cert.year,
        file_url: cert.file,
        issuer_url: cert.issuerUrl,
        is_published: true
      });
      if (error) console.error('Certificate Error:', error);
    }

    // 7. Profiles
    console.log('Migrating Profiles...');
    const platforms = Object.keys(profile.profiles);
    for (const p of platforms) {
      const pData = (profile.profiles as any)[p];
      const { error } = await supabase.from('profiles').insert({
        platform: p,
        profile_url: pData.url,
        display_name: p,
        icon_name: p.charAt(0).toUpperCase() + p.slice(1),
        is_published: true
      });
      if (error) console.error('Profile Link Error:', error);
    }

    console.log('Migration Completed Successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrateData();
