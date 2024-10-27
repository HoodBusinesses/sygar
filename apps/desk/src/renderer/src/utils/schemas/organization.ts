import * as z from 'zod'

export const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  ice: z.string().min(1, 'ICE is required'),
  cnss: z.string().min(1, 'CNSS is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email address'),
  logo: z.any().optional(),
  responsibleName: z.string().min(1, 'Responsible name is required'),
  trainingManagerName: z.string().min(1, 'Training manager name is required')
})

export const memberSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['manager', 'employee'], {
    required_error: 'Role is required'
  }),
  actionType: z.enum(['edit', 'view'], {
    required_error: 'Action type is required'
  })
})

export type OrganizationFormData = z.infer<typeof organizationSchema>
export type MemberFormData = z.infer<typeof memberSchema>
