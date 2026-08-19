import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './categories';

// src/content/posts/ko/*.md  → 한국어 글
// src/content/posts/en/*.md  → 영어 글
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    /**
     * 글당 1개. 정의되지 않은 값을 쓰면 빌드가 실패합니다.
     * 공지·회고 같은 메타 글은 생략 가능 (배지가 안 붙습니다).
     */
    category: z.enum([...CATEGORY_SLUGS] as [string, ...string[]]).optional(),

    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    translationOf: z.string().optional(),
  }),
});

export const collections = { posts };
