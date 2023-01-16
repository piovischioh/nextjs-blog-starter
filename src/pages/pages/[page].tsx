import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import type { Post } from 'contentlayer/generated';
import PostList from '@/components/PostList';
import getPostsByDescDate from '@/utils/getPostsByDescDate';

export interface PropsType {
  posts: Post[];
  initialDisplayPosts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export const POSTS_PER_PAGE = 5;

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = Math.ceil(getPostsByDescDate().length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PropsType,
  { page: string }
> = async ({ params }) => {
  const pageNumber = parseInt(params?.page || '1', 10);

  if (Number.isNaN(pageNumber)) return { notFound: true };

  const allPosts = getPostsByDescDate();
  const initialDisplayPosts = allPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
  };
  return { props: { posts: allPosts, initialDisplayPosts, pagination } };
};

const PostsPage: NextPage<PropsType> = ({
  posts,
  initialDisplayPosts,
  pagination,
}: PropsType) => (
  <PostList
    listTitle="Posts"
    posts={posts}
    initialDisplayPosts={initialDisplayPosts}
    pagination={pagination}
  />
);

export default PostsPage;
