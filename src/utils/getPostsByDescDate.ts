import { compareDesc } from 'date-fns';

import { allPosts } from 'contentlayer/generated';

const getPostsByDescDate = () => {
  if (process.env.NODE_ENV === 'production')
    return allPosts
      .filter((post) => !post.draft)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
};

export default getPostsByDescDate;
