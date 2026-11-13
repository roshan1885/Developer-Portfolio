'use client';

import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
    },
  }),
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24">
      <div className="space-y-4 mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-primary">
          My Projects
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Here are some of the projects I've worked on.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ transformPerspective: 1000 }}
          >
            <Card className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 bg-card/60 border border-border/50 hover:border-accent/30">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    data-ai-hint={project.image.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow space-y-3">
                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-normal px-2 py-1">{tech}</Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge variant="secondary" className="text-xs font-normal px-2 py-1">+{project.techStack.length - 4}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-3">
                {project.liveUrl && (
                  <Button size="sm" asChild className="gap-1 flex-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="sm" variant="outline" asChild className="gap-1 flex-1">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" /> Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

