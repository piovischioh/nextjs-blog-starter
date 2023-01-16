import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { slug } from 'github-slugger';

import type { Post } from 'contentlayer/generated';
import PostList from '@/components/PostList';
import getPostsByDescDate from '@/utils/getPostsByDescDate';
import getTags from '@/utils/getTags';

interface PropsType {
  tag: string;
  posts: Post[];
  initialDisplayPosts: Post[];
}

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

  const posts = getPostsByDescDate().filter(({ tags }) =>
    tags.find((tag) => slug(tag) === params.tag),
  );
  const tag = params.tag
    .split('-')
    .reduce(
      (prev, current) =>
        `${prev} ${current[0].toUpperCase()}${current.slice(1)}`,
      '',
    )
    .trim();

  return { props: { posts, initialDisplayPosts: posts, tag } };
};
const TagPage: NextPage<PropsType> = ({
  tag,
  posts,
  initialDisplayPosts,
}: PropsType) => (
  <PostList
    listTitle={tag}
    posts={posts}
    initialDisplayPosts={initialDisplayPosts}
  />
);

export default TagPage;
