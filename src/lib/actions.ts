'use server';

import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function sendMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      success: false,
    };
  }

  try {
    // In a real application, you would send this data to a backend service.
    // e.g., using a Firebase Function, an API endpoint, or an email service.
    console.log('Contact form submitted:');
    console.log({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      message: validatedFields.data.message,
    });
    
    return { message: 'Your message has been sent successfully!', success: true };
  } catch (e) {
    return { message: 'Something went wrong. Please try again.', success: false };
  }
}
