'use client';

import { Button } from '@/components/ui/button';
import ThreeCanvas from '@/components/ThreeCanvas';
import { ArrowDown, Github, Linkedin, Mail, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { TypeAnimation } from 'react-type-animation';

const stats = [
  { label: 'Projects', value: '20+' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Clients Helped', value: '25+' },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      
      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background text-foreground border border-foreground/30 text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-foreground" />
              Available for hire
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>




            <TypeAnimation
              sequence={["Roshan B."]}
              cursor={false}

              className="mb-4 block text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground text-transparent bg-clip-text"
              wrapper="span"


















            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>






                        <TypeAnimation
              sequence={["Backend-first Full-Stack Developer & Creative Technologist"]}
              cursor={false}

              className="mb-4 block text-xl md:text-2xl text-primary font-headline max-w-2xl mx-auto"
              wrapper="p"















            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}>
            <TypeAnimation
              sequence={["Building scalable systems, AI automation, and creative technology solutions that make an impact."]}
              cursor={false}
              className="mb-8 block max-w-xl mx-auto text-muted-foreground md:text-lg leading-relaxed"
              wrapper="p"
            />
          </motion.div>

          <motion.div
            className="flex justify-center gap-8 md:gap-16 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-headline text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button size="lg" asChild className="gap-2 bg-foreground text-primary-foreground hover:bg-foreground/90">
              <a href="#projects">
                View Projects
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground">
              <a href="#contact">
                Get in Touch
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="https://github.com/roshan1885" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="p-2 rounded-full bg-card hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/roshanb08" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="p-2 rounded-full bg-card hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:contact@roshan.is-a.dev" aria-label="Email"
              className="p-2 rounded-full bg-card hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
