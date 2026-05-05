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
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
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
            <Card className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 bg-card/60">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    data-ai-hint={project.image.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-normal">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                {project.liveUrl && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      View Live <ArrowUpRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" /> GitHub
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
