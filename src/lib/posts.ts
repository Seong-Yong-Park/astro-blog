import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../consts';
import { CATEGORY_SLUGS, type CategorySlug } from '../categories';

export type Post = CollectionEntry<'posts'>;

/** 'ko/safe-ros-terms' → 'safe-ros-terms' */
export const slugOf = (post: Post) => post.id.replace(/^(ko|en)\//, '');
export const langOf = (post: Post) => post.id.split('/')[0] as Lang;
export const categoryOf = (post: Post) => post.data.category as CategorySlug | undefined;

/** 해당 언어의 글을 최신순으로. 빌드 시 draft는 제외 */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('posts');
  return all
    .filter((p) => langOf(p) === lang)
    .filter((p) => import.meta.env.DEV || !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllPublished(): Promise<Post[]> {
  const all = await getCollection('posts');
  return all.filter((p) => import.meta.env.DEV || !p.data.draft);
}

export async function getTags(lang: Lang) {
  const posts = await getPosts(lang);
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** 정의된 순서(요구 → 위험 → 대응 → 증명 → 기술)를 유지합니다. 개수순 아님 */
export async function getCategoryCounts(lang: Lang) {
  const posts = await getPosts(lang);
  return CATEGORY_SLUGS.map((slug) => ({
    slug,
    count: posts.filter((p) => p.data.category === slug).length,
  }));
}

export async function getPostsInCategory(lang: Lang, slug: CategorySlug) {
  const posts = await getPosts(lang);
  return posts.filter((p) => p.data.category === slug);
}
