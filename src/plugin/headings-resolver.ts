import type { Post } from 'contentlayer/generated';
import { slug } from 'github-slugger';

const headingResolver = ({ body: { raw } }: Post) =>
  raw
    .split('\n')
    .filter((line) => line.match(/^###?\s/))
    .map((line) => {
      const text = line.replace(/^###*\s/, '');
      const primary = line.startsWith('###');

      return {
        text,
        url: `#${slug(text)}`,
        primary,
      };
    });

export default headingResolver;
