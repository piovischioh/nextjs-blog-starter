import Link from 'next/link';
import { ArticleJsonLd } from 'next-seo';
import { compareDesc, format, parseISO } from 'date-fns';

import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import metadata from '@/configs/metadata.mjs';

interface PropsType {
  posts: Post[];
}
export function getStaticProps() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  return { props: { posts } };
}

const MAX_DISPLAY = 5;

const Index = ({ posts }: PropsType) => (
  <>
    <ArticleJsonLd
      type="Blog"
      url={metadata.fqdn}
      title={metadata.title}
      images={[metadata.bannerUrl]}
      datePublished={metadata.datePublished}
      authorName={metadata.author}
      description={metadata.description}
    />

    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Latest
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Welcome to my blog!
        </p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}

        {posts
          .slice(0, MAX_DISPLAY)
          .map(({ date, filename, path, title, tags, description }) => (
            <li key={filename} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {format(parseISO(date), 'LLLL d, yyyy')}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={path}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/tags/${tag}`}
                              className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {tag.split(' ').join('-')}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={path}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
      </ul>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </div>
  </>
);

export default Index;
