import { slug } from 'github-slugger';

import { allPosts } from 'contentlayer/generated';

const getTags = () => {
  const tags: { [tag: string]: number } = {};

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const formattedTag = slug(tag);
      if (formattedTag in tags) {
        tags[formattedTag] += 1;
      } else {
        tags[formattedTag] = 1;
      }
    });
  });

  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return { tags, sortedTags };
};

export default getTags;
