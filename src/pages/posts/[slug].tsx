import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';

interface PropsType {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts.map((post) => post.path);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PropsType> = ({ params }) => {
  const post = allPosts.find((_post) => _post.filename === params?.slug);

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
  };
};

const PostPage: NextPage<PropsType> = ({ post }: PropsType) => {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose dark:prose-invert">
        <h1>{post.title}</h1>

        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>

        <MDXContent />
      </main>
    </>
  );
};

export default PostPage;
