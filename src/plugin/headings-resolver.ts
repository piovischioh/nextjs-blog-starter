// src/plugin/headings-resolver.ts
import GithubSlugger from 'github-slugger';
import type { Post } from 'contentlayer/generated';

const headingResolver = ({ body: { raw } }: Post) => {
  const slugger = new GithubSlugger();
  slugger.reset(); // Important: reset for each document to ensure slugs are unique per page scope

  return raw
    .split('\n')
    .filter((line) => line.match(/^###?\s/))
    .map((line) => {
      const text = line.replace(/^###*\s/, '');
      const slugText = text.trim() ? text : 'section'; // Provide "section" for empty/whitespace strings

      return {
        text, // Keep original text for display
        url: `#${slugger.slug(slugText)}`, // Use slugger instance with potentially modified text
        primary: !line.startsWith('###'),
      };
    });
};

export default headingResolver;
