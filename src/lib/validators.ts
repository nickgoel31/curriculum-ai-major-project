import { z } from 'zod';

export const studentProfileSchema = z.object({
  current_skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  target_role: z.string().min(2, 'Please enter a target role'),
  experience_level: z.enum(['beginner', 'intermediate', 'advanced']),
  available_hours_per_week: z.number().min(1).max(168),
  preferred_language: z.enum(['english', 'hindi', 'hinglish']),
});

export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
