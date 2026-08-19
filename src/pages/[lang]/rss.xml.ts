import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LANGS, SITE, type Lang } from '../../consts';
import { getPosts, slugOf } from '../../lib/posts';
import { ui } from '../../i18n/ui';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPosts(lang);
  return rss({
    title: SITE.title,
    description: ui['site.desc'],
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${lang}/posts/${slugOf(post)}/`,
    })),
  });
}
