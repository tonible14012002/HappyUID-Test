import { z } from 'zod'

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex',
}

export const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(50, 'Description is at least 50 characters'),
  sizes: z.array(z.string()).min(1, 'Select available sizes'),
  gender: z.nativeEnum(GenderEnum, {
    required_error: 'Select one gender',
  }),
  media: z
    .record(
      z.string(),
      z.object({
        url: z.string(),
        name: z.string(),
        id: z.string(),
      }),
    )
    .refine(
      (value) => {
        return Object.values(value).length
      },
      {
        path: ['media'],
        message: 'At least one image is required',
      },
    ),
  categories: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .min(1, 'Select at least one category')
    .optional(),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((value) => {
      return !isNaN(Number(value))
    }),
})

export const defaultValues = {
  name: '',
  sizes: [],
  gender: GenderEnum.Female,
  description: '',
  media: {},
  price: '0',
}

export type ProductFormValues = z.infer<typeof schema>

export type MediaMeta = {
  name: string
  url: string
  id: string
  uploaded?: boolean
}

export const SIZES = {
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
} as const
