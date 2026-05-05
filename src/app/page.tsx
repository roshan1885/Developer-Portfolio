import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 md:px-6 space-y-20 md:space-y-32">
          <AnimatedSection>
            <AboutSection />
          </AnimatedSection>
          <AnimatedSection>
            <ProjectsSection />
          </AnimatedSection>
          <AnimatedSection>
            <ContactSection />
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}