import type { GetStaticProps } from 'next';
import { compareDesc } from 'date-fns';

import { allPosts } from 'contentlayer/generated';
import type { PropsType } from './pages/[page]';
import PostsPage, { POSTS_PER_PAGE } from './pages/[page]';

export const getStaticProps: GetStaticProps<PropsType> = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * 1);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
  return { props: { posts, initialDisplayPosts, pagination } };
};
export default PostsPage;
