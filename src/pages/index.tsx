import Head from 'next/head';
import Link from 'next/link';
import { compareDesc } from 'date-fns';

import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';

interface PropsType {
  posts: Post[];
}
export function getStaticProps() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  return { props: { posts } };
}

const Index = ({ posts }: PropsType) => (
  <>
    <Head>
      <title>My Blog</title>
      <meta name="description" content="Welcome to my blog!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="p-4">
      <h1 className="mb-6 text-4xl font-bold">Welcome to my blog!</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.filename}
            href={post.path}
            className="rounded-lg border border-black p-6 dark:border-white"
          >
            <h2 className="mb-4 text-2xl font-semibold">{post.title}</h2>
            <p>{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  </>
);

export default Index;
