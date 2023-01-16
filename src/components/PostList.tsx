import { useState } from 'react';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { format, parseISO } from 'date-fns';

import type { Post } from 'contentlayer/generated';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import Tag from '@/components/Tag';
import metadata from '@/configs/metadata.mjs';

export interface PropsType {
  listTitle: string;
  posts: Post[];
  initialDisplayPosts: Post[];
  pagination?: {
    currentPage: number;
    totalPages: number;
  };
}

const PostList = ({
  listTitle,
  posts,
  initialDisplayPosts,
  pagination,
}: PropsType) => {
  const [searchValue, setSearchValue] = useState('');
  const resultPosts = posts.filter(({ title, description, tags }) => {
    const searchContent = `${title} - ${description} - ${tags.join(' ')}`;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });
  const displayPosts = searchValue ? resultPosts : initialDisplayPosts;

  return (
    <>
      <NextSeo title={listTitle} />

      <ArticleJsonLd
        type="Blog"
        url={metadata.fqdn}
        title={`${listTitle} | ${metadata.title}`}
        images={[metadata.bannerUrl]}
        datePublished={metadata.datePublished}
        authorName={metadata.author}
        description={metadata.description}
      />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {listTitle}
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
                                <Tag key={tag} text={tag} />
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

      {!pagination || pagination.totalPages <= 1 || searchValue ? null : (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
};

export default PostList;
