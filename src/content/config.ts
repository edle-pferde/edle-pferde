// @ts-ignore
import {defineCollection, z} from 'astro:content'

const articles = defineCollection({
  // @ts-ignore
  schema: ({image}) => z.object({
    title: z.string(),
    created_at: z.date(),
    cover_image: image(),
    gallery: z.array(image()).nullable().optional(),
    horses: z.array(z.string()).nullable().optional(),
  }),
})

const horses = defineCollection({
  // @ts-ignore
  schema: ({image}) => z.object({
    full_name: z.string(),
    family: z.string().nullable().optional(),
    current_owner: z.string().nullable().optional(),
    status: z.string(),
    gender: z.string(),
    birth_year: z.string(),
    lived_until: z.string().nullable().optional(),
    in_stable_until: z.string().default('0'),
    profile_picture: image(),
    profile_picture_alt_text: z.string().nullable().optional(),
    profile_picture_crop_position: z.string().nullable().optional(),
    gallery: z.array(image()).nullable().optional(),
    youtube_video_id: z.string().nullable().optional(),
    breed: z.string(),
    size: z.string().nullable().optional(),
    color: z.string(),
    bio: z.string(),
    father: z.object({
      discriminant: z.boolean(),
      value: z.string().nullable().optional()
    }).nullable().optional(),
    mother: z.object({
      discriminant: z.boolean(),
      value: z.string().nullable().optional()
    }).nullable().optional(),
    fathers_father: z.object({
      discriminant: z.boolean(),
      value: z.string().nullable().optional()
    }).nullable().optional(),
    fathers_mother: z.object({
      discriminant: z.boolean(),
      value: z.string().nullable().optional()
    }).nullable().optional(),
    mothers_father: z.object({
      discriminant: z.boolean(),
      value: z.string().nullable().optional()
    }).nullable().optional(),
    mothers_mother: z.object({
      discriminant: z.boolean(),
      value: z.string().nullable().optional()
    }).nullable().optional(),
  }),
})

const pages = defineCollection({
  schema: ({image}) => z.object({
    title: z.string(),
    gallery: z.array(image()).nullable().optional(),
  }),
})

export const collections = {articles, horses, pages}
