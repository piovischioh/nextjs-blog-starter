import type { GetStaticProps } from 'next';

import allPosts from '@/utils/getPostsByDescDate';
import type { PropsType } from './pages/[page]';
import PostsPage, { POSTS_PER_PAGE } from './pages/[page]';

export const getStaticProps: GetStaticProps<PropsType> = async () => {
  const initialDisplayPosts = allPosts.slice(0, POSTS_PER_PAGE * 1);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
  };
  return { props: { posts: allPosts, initialDisplayPosts, pagination } };
};
export default PostsPage;
