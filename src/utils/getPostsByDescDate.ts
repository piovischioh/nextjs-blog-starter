import { compareDesc } from 'date-fns';

import { allPosts } from 'contentlayer/generated';

export default allPosts.sort((a, b) =>
  compareDesc(new Date(a.date), new Date(b.date)),
);
