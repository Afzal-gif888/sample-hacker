import { z } from 'zod';

export const createStudentSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Full name must be at least 2 characters.'),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Please enter a valid email address.'),
    collegeName: z
      .string()
      .trim()
      .min(2, 'College name must be at least 2 characters.'),
    branch: z
      .enum([
        'Computer Science Engineering',
        'Information Technology',
        'Electronics & Communication Engineering',
        'Electrical & Electronics Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Other'
      ], {
        message: 'Please select a valid branch.',
      }),
    rollNumber: z
      .string()
      .trim()
      .min(1, 'Roll number cannot be empty.')
      .refine((val) => val.trim().length > 0, {
        message: 'Roll number cannot contain only whitespace.',
      }),
  }),
});
