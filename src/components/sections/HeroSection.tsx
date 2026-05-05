'use client';

import { Button } from '@/components/ui/button';
import ThreeCanvas from '@/components/ThreeCanvas';
import { ArrowDown } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      <ThreeCanvas />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TypeAnimation
              sequence={[
                'Roshan B.',
                1500,
              ]}
              wrapper="h1"
              speed={20}
              cursor={true}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
            <TypeAnimation
              sequence={[
                'Backend‑first Full‑Stack Developer & Creative Technologist',
                1000
              ]}
              wrapper="p"
              speed={50}
              className="mt-4 text-lg md:text-xl text-primary font-headline"
            />
          </motion.div>
         
          <motion.p 
            className="mt-6 max-w-xl mx-auto text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Blending engineering precision with creative expression, my goal is to build solutions that inspire, empower, and scale.
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            <Button size="lg" asChild className="animate-pulse hover:animate-none">
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
