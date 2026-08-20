import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import AboutPage from './pages/About';
import EducationPage from './pages/Education';
import ExperiencePage from './pages/Experience';

import PublicationsPage from './pages/Publications';
import ProfilesPage from './pages/Profiles';
import ProjectsPage from './pages/Projects';
import CertificatesPage from './pages/Certificates';
import ContactPage from './pages/Contact';

import { PortfolioProvider } from './context/PortfolioContext';
import { AdminLayout } from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManagePublications from './pages/admin/ManagePublications';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageProjects from './pages/admin/ManageProjects';
import ManageExperience from './pages/admin/ManageExperience';
import ManageEducation from './pages/admin/ManageEducation';
import ManageProfiles from './pages/admin/ManageProfiles';
import ManageAbout from './pages/admin/ManageAbout';

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Portfolio Routes */}
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Navigate to="/about" replace />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="publications" element={<PublicationsPage />} />
            <Route path="profiles" element={<ProfilesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin CMS Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="about" element={<ManageAbout />} />
            <Route path="education" element={<ManageEducation />} />
            <Route path="experience" element={<ManageExperience />} />
            <Route path="publications" element={<ManagePublications />} />
            <Route path="certificates" element={<ManageCertificates />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="profiles" element={<ManageProfiles />} />
            <Route path="*" element={<div className="p-8 text-center text-secondary-text">CMS Page under construction. Check tasks for progress.</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}
export default App;
