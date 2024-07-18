import {z} from 'zod';

export const contractorSchema = z.object({
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(), 
    role: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),     
})

export const clientSchema = z.object({
  brideName: z.string().min(2).max(50),
  groomName: z.string().min(2).max(50),
  email: z.string().email(),
  secondaryEmail: z.string().email().optional(),
  phone: z.string().optional(),
  weddingDate: z.date(),
  weddingLocation: z.string().optional(),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  packagePrice: z.string(),
});