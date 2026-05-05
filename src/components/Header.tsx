'use client';

import { Code2 } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { AnimatedMenuIcon } from './AnimatedMenuIcon';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
  >
    <span>{label}</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
  </a>
);

export default function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-lg">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline">Roshan</span>
          </a>
        </div>
        
        {isMobile ? (
          <div className="flex-1 flex justify-end">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <AnimatedMenuIcon 
                  isActive={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
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
          <nav className="flex-1 flex items-center justify-end space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}