-- Portfolio Database Schema

-- 1. About Table
CREATE TABLE IF NOT EXISTS public.about (
  id text PRIMARY KEY,
  name text,
  designation text,
  department text,
  institution text,
  institution_website text,
  location text,
  about_location text,
  degree text,
  email text,
  photo_url text,
  about_short text,
  cgpa text,
  education_subtitle text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Education Table
CREATE TABLE IF NOT EXISTS public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  field text,
  institution text NOT NULL,
  institution_url text,
  start_year text,
  end_year text,
  location text,
  status text,
  description text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  organisation text NOT NULL,
  start_year text,
  end_year text,
  location text,
  type text,
  description text,
  responsibilities jsonb,
  technologies jsonb,
  certificate_url text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Publications Table
CREATE TABLE IF NOT EXISTS public.publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  authors text NOT NULL,
  publication_type text,
  year text,
  publisher text,
  summary text,
  doi text,
  publication_url text,
  book_name text,
  book_url text,
  indexing text,
  status text DEFAULT 'Published',
  isbn text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_description text,
  detailed_description text,
  technology_stack jsonb,
  github_url text,
  live_demo_url text,
  image_url text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  year text,
  file_url text,
  issuer_url text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  display_name text,
  profile_url text NOT NULL,
  icon_name text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure missing columns are added in case the tables already existed with an older schema
ALTER TABLE public.about ADD COLUMN IF NOT EXISTS about_location text;
ALTER TABLE public.about ADD COLUMN IF NOT EXISTS about_short text;
ALTER TABLE public.about ADD COLUMN IF NOT EXISTS education_subtitle text;
ALTER TABLE public.about ADD COLUMN IF NOT EXISTS cgpa text;

ALTER TABLE public.education ADD COLUMN IF NOT EXISTS start_year text;
ALTER TABLE public.education ADD COLUMN IF NOT EXISTS end_year text;
ALTER TABLE public.education ADD COLUMN IF NOT EXISTS field text;
ALTER TABLE public.education ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS responsibilities jsonb;
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS technologies jsonb;
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS certificate_url text;
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS publication_type text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS publisher text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS summary text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS doi text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS publication_url text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS book_name text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS book_url text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS indexing text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS status text DEFAULT 'Published';
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS isbn text;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS short_description text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS detailed_description text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS technology_stack jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS live_demo_url text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS file_url text;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS issuer_url text;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

-- Enable RLS (Row Level Security) - allow public read, and allow all for now (for the sake of the migration)
-- Note: In a production setting, you should lock down write access to authenticated users only.
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow anon access (since we are doing local dev/portfolio)

-- About
DROP POLICY IF EXISTS "Enable read access for all users" ON public.about;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.about;
CREATE POLICY "Enable read access for all users" ON public.about FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.about FOR ALL USING (true);

-- Education
DROP POLICY IF EXISTS "Enable read access for all users" ON public.education;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.education;
CREATE POLICY "Enable read access for all users" ON public.education FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.education FOR ALL USING (true);

-- Experience
DROP POLICY IF EXISTS "Enable read access for all users" ON public.experience;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.experience;
CREATE POLICY "Enable read access for all users" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.experience FOR ALL USING (true);

-- Publications
DROP POLICY IF EXISTS "Enable read access for all users" ON public.publications;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.publications;
CREATE POLICY "Enable read access for all users" ON public.publications FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.publications FOR ALL USING (true);

-- Projects
DROP POLICY IF EXISTS "Enable read access for all users" ON public.projects;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.projects;
CREATE POLICY "Enable read access for all users" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.projects FOR ALL USING (true);

-- Certificates
DROP POLICY IF EXISTS "Enable read access for all users" ON public.certificates;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.certificates;
CREATE POLICY "Enable read access for all users" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.certificates FOR ALL USING (true);

-- Profiles
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.profiles;
CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.profiles FOR ALL USING (true);

-- Grant privileges to anon and authenticated roles (Required for RLS policies to take effect for these roles)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.about TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.education TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.experience TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.publications TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificates TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO anon, authenticated;
