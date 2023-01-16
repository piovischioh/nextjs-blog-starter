import type { GetStaticPaths, GetStaticProps } from 'next';

import allPosts from '@/utils/getPostsByDescDate';
import getTags from '@/utils/getTags';
import type { PropsType } from '../pages/[page]';
import PostsPage from '../pages/[page]';

export const getStaticPaths: GetStaticPaths = async () => {
  const { sortedTags } = getTags();

  return {
    paths: sortedTags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PropsType,
  { tag: string }
> = async ({ params }) => {
  if (!params?.tag) return { notFound: true };

  const posts = allPosts.filter(({ tags }) => tags.includes(params.tag));

  return { props: { posts, initialDisplayPosts: posts } };
};
export default PostsPage;
