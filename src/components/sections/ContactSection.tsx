'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validated = FormSchema.safeParse(formData);

    if (!validated.success) {
      const fieldErrors = validated.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || '',
        email: fieldErrors.email?.[0] || '',
        message: fieldErrors.message?.[0] || '',
      });
      toast({ variant: 'destructive', title: 'Error', description: 'Please correct the errors below.' });
      return;
    }

    const response = await fetch('https://formspree.io/f/mjglwopa', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      toast({ title: 'Success!', description: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', message: '' }); // ✅ clears inputs
      setErrors({});
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24">
      <div className="grid items-center justify-center gap-4 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-primary">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind? I'd love to hear from you.
          </p>
        </div>
        <Card className="w-full max-w-lg mx-auto text-left">
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
            <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message..." className="min-h-[120px]" value={formData.message} onChange={handleChange} />
                {errors.message && <p className="text-sm font-medium text-destructive">{errors.message}</p>}
              </div>

              {/* Honeypot field */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              {/* CAPTCHA field */}
              <input type="hidden" name="_captcha" value="true" />

              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
