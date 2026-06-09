import { z } from "zod";

const nameRegex = /^[A-Za-z\s-']+$/;
const nameMessage = "Only letters, spaces, hyphens, and apostrophes allowed";
const phoneRegex = /^\+?[0-9\s-]{7,20}$/;

export const supportSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100).regex(nameRegex, nameMessage),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address format"),
  phone: z.string().trim().min(1, "Phone number is required").regex(phoneRegex, "Invalid phone number format"),
  requestType: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
});

export type SupportFormData = z.infer<typeof supportSchema>;
