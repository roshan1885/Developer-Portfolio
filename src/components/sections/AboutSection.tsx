'use client';

import { Card } from '@/components/ui/card';
import { GitMerge } from 'lucide-react';
import { motion } from 'framer-motion';

import { ReactIcon } from '../icons/ReactIcon';
import { NodeIcon } from '../icons/NodeIcon';
import { TypeScriptIcon } from '../icons/TypeScriptIcon';
import { PhpIcon } from '../icons/PhpIcon';
import { HtmlCssIcon } from '../icons/HtmlCssIcon';
import { SqlIcon } from '../icons/SqlIcon';
import { PythonIcon } from '../icons/PythonIcon';
import { JavaIcon } from '../icons/JavaIcon';
import { GitHubIcon } from '../icons/GitHubIcon';

const skills = [
  { icon: ReactIcon, name: 'React', color: 'text-sky-400' },
  { icon: NodeIcon, name: 'Node.js', color: 'text-emerald-400' },
  { icon: TypeScriptIcon, name: 'TypeScript', color: 'text-blue-400' },
  { icon: PhpIcon, name: 'PHP', color: 'text-indigo-400' },
  { icon: HtmlCssIcon, name: 'HTML & CSS', color: 'text-pink-400' },
  { icon: SqlIcon, name: 'SQL', color: 'text-orange-400' },
  { icon: GitHubIcon, name: 'GitHub', color: 'text-slate-400' },
  { icon: PythonIcon, name: 'Python', color: 'text-yellow-400' },
  { icon: JavaIcon, name: 'Java', color: 'text-red-400' },
];


const SkillCard = ({ skill, index }: { skill: typeof skills[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 + index * 0.1 }}
    whileHover={{ scale: 1.1, y: -5 }}
  >
    <Card className="p-4 flex flex-col items-center justify-center gap-2 bg-card/50 hover:bg-card transition-colors h-full">
      <skill.icon className={`w-8 h-8 ${skill.color}`} />
      <p className="text-sm font-medium text-center">{skill.name}</p>
    </Card>
  </motion.div>
);

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-primary">
            About Me
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed">
            I'm a backend engineer and developer who has architected and refined Discord bots with advanced dashboards and automation, rebuilt WHMCS software for optimized performance and scalability, and designed efficient API solutions to streamline workflows. Alongside my engineering work, I'm also a creative explorer — a pianist and guitarist with a passion for music, a poet and storyteller who blends creativity with logic, and a skilled video and photo editor who brings ideas to life visually.
          </p>
          <p className="text-muted-foreground md:text-lg/relaxed">
            As a mentor and guide, I've supported more than 25 students in Computer Science, helping learners of all ages build confidence in technology while simplifying complex concepts. My versatility extends into business and technical domains as well, with skills in Tally accounting, financial management, business operations, and network setup and administration.
          </p>
          <p className="text-muted-foreground md:text-lg/relaxed">
            I'm also an AI and machine learning enthusiast, designing automation solutions powered by ML, exploring AI-driven workflows to maximize efficiency, and innovating at the intersection of creativity and technology.
          </p>

        </div>
        <div className="flex flex-col items-center justify-center gap-8 md:col-span-2">
          <div className="w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center font-headline text-primary">My Skills</h3>
            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
