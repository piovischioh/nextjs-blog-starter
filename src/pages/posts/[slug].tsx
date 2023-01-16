import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { format, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

import type { Post } from 'contentlayer/generated';
import Comments from '@/components/Comments';
import Image from '@/components/Image';
import Link from '@/components/Link';
import Headings from '@/components/Headings';
import Pre from '@/components/Pre';
import TOC from '@/components/TOC';
import metadata from '@/configs/metadata.mjs';
import getPostsByDescDate from '@/utils/getPostsByDescDate';

interface PropsType {
  post: Post;
}

const MDXComponents = {
  Image,
  a: Link,
  pre: Pre,
  ...Headings,
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getPostsByDescDate().map(({ filename }) => ({
    params: { slug: filename },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PropsType, { slug: string }> = ({
  params,
}) => {
  const post = getPostsByDescDate().find(
    (_post) => _post.filename === params?.slug,
  );

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
    path,
    images,
    headings,
    body: { code },
  } = post;
  const url = metadata.fqdn + path;
  const MDXComponent = useMDXComponent(code);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
          images: !images?.length
            ? [{ url: metadata.bannerUrl }]
            : images.map((image) => ({ url: image })),
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: date,
          },
        }}
      />

      <ArticleJsonLd
        url={url}
        title={title}
        images={!images?.length ? [metadata.bannerUrl] : images}
        datePublished={date}
        dateModified={date}
        authorName={metadata.author}
        description={description}
      />

      <article className="duration-300 lg:grid lg:grid-cols-4 lg:gap-x-8">
        <div className="prose max-w-none dark:prose-invert lg:col-span-3">
          <time dateTime={date} className="text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>

          <h1>{title}</h1>

          <MDXComponent components={MDXComponents} />

          <Comments />
        </div>

        <TOC headings={headings} />
      </article>
    </>
  );
};

export default PostPage;
