// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ⬇⬇⬇ 도메인 사서 연결한 뒤 여기만 바꾸면 됩니다 ⬇⬇⬇
  site: 'https://example.com',

  integrations: [mdx(), sitemap()],

  // 루트(/)로 들어오면 한국어 홈으로 보냅니다
  // (영어 글이 쌓이면 '/en/'으로 되돌리고 consts.ts의 DEFAULT_LANG도 함께 변경)
  redirects: {
    '/': '/ko/',
  },

  markdown: {
    shikiConfig: {
      // 라이트/다크 모두 대응
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
});
