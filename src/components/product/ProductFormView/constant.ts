import { z } from 'zod'

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex',
}

export const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(200, 'Description is at least 200 characters'),
  sizes: z.array(z.string()).min(1, 'Select available sizes'),
  gender: z.nativeEnum(GenderEnum, {
    required_error: 'Select one gender',
  }),
  media: z.array(z.string()).min(1, 'Upload at least one image'),
  tags: z.array(z.string()).optional(),
})

export type ProductFormValues = z.infer<typeof schema>
