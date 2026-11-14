'use client';

import { Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { AnimatedMenuIcon } from './AnimatedMenuIcon';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const NavLink = ({ href, label, onClick, isScrolled }: { href: string; label: string; onClick?: () => void; isScrolled?: boolean }) => (
  <a
    href={href}
    onClick={onClick}
    className={
      `text-sm font-medium transition-all duration-200 relative group $
        {isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-foreground/80 hover:text-primary'}
      `}>
    <span>{label}</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
  </a>
);

export default function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={
        `sticky top-0 z-50 w-full transition-all duration-500 ease-out $
          {scrolled
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.3)]'
            : 'bg-transparent backdrop-blur-none border-b border-transparent shadow-none'}
      `}
    >
      <div className="container flex h-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mr-6 flex items-center space-x-2"
        >
          <a href="#" aria-label="Roshan Homepage" className="flex items-center space-x-2">
            <div className="relative">
              <Code2 className="h-7 w-7 text-primary drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" aria-hidden="true" />
              {scrolled && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
              )}
            </div>
            <span className="font-bold font-headline text-xl tracking-tight">Roshan B.</span>
          </a>
        </motion.div>
        
        {isMobile ? (
          <div className="flex-1 flex justify-end gap-3">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <AnimatedMenuIcon 
                  isActive={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-background/95 backdrop-blur-xl">
                <SheetHeader className="text-left">
                   <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 text-lg font-medium mt-8">
                  {NAV_LINKS.map((link) => (
                    <NavLink key={link.href} {...link} onClick={() => setIsOpen(false)} />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <motion.nav
            className="flex-1 flex items-center justify-end space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} {...link} isScrolled={scrolled} />
            ))}
            <div className="w-px h-6 bg-border/30 mx-3" />
            <ThemeToggle />
          </motion.nav>
        )}
      </div>
    </header>
  );
}

