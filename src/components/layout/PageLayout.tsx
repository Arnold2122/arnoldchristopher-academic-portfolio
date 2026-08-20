import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { SectionFooter } from './SectionFooter';

export function PageLayout() {
  useEffect(() => {
    document.title = "Mr. A. Arnold Christopher | Academic Portfolio";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg selection:bg-gold/30 selection:text-primary-text">
      <Navbar />
      <main className="flex-1 pt-[104px]">
        <Outlet />
      </main>
      <SectionFooter />
    </div>
  );
}
