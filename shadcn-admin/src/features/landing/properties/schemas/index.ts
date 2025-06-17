import { z } from 'zod'

// Shared schema for property search validation
export const propertySearchSchema = z.object({
  page: z.coerce.number().min(1).catch(1),
  propertyType: z.string().optional().default(''),
  status: z.string().optional().default(''),
  sortBy: z
    .enum(['createdAt', 'price', 'title'])
    .optional()
    .default('createdAt'),
  propertyName: z.string().optional().default(''),
  limit: z.coerce.number().min(1).max(100).optional().default(12),
})

// Export the inferred type for use across the application
export type PropertySearchParams = z.infer<typeof propertySearchSchema>
