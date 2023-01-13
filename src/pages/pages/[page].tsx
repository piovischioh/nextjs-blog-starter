import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { ArticleJsonLd } from 'next-seo';
import { format, parseISO } from 'date-fns';

import type { Post } from 'contentlayer/generated';
import Link from '@/components/Link';
import metadata from '@/configs/metadata.mjs';
import allPosts from '@/utils/getPostsByDescDate';

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
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
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
}: PropsType) => {
  const { currentPage, totalPages } = pagination;
  const [searchValue, setSearchValue] = useState('');
  const resultPosts = posts.filter(({ title, description, tags }) => {
    const searchContent = `${title} - ${description} - ${tags.join(' ')}`;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });
  const displayPosts = searchValue ? resultPosts : initialDisplayPosts;

  return (
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
            Posts
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search posts"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {!displayPosts.length ? (
          <div className="p-5 text-center text-2xl font-bold">No Result</div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {displayPosts.map(
              ({ date, filename, path, title, tags, description }) => (
                <li key={filename} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
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
                          <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                            {description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ),
            )}
          </ul>
        )}
      </div>

      {totalPages <= 1 || searchValue ? null : (
        <div className="flex justify-end pt-6 pb-8">
          <nav className="flex items-center justify-center space-x-3">
            {currentPage === 1 ? null : (
              <Link
                className="text-primary-600 dark:text-primary-500"
                href={currentPage - 1 === 1 ? '/' : `/pages/${currentPage - 1}`}
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" />
                </svg>
              </Link>
            )}
            <span>
              {currentPage} / {totalPages}
            </span>
            {currentPage === totalPages ? null : (
              <Link
                className="text-primary-600 dark:text-primary-500"
                href={`/pages/${currentPage + 1}`}
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default PostsPage;
