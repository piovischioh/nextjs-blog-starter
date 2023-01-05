import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import Pre from '@/components/Pre';

interface PropsType {
  post: Post;
}

const mdxComponents = {
  pre: Pre,
};

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
  const {
    title,
    description,
    date,
    body: { code },
  } = post;
  const MDXContent = useMDXComponent(code);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="prose max-w-none duration-500 dark:prose-invert">
        <time dateTime={date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>

        <h1>{title}</h1>

        <MDXContent components={mdxComponents} />
      </div>
    </>
  );
};

export default PostPage;
