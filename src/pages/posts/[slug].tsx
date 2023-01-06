import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { format, parseISO } from 'date-fns';
import { useMDXComponent } from 'next-contentlayer/hooks';

import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import Pre from '@/components/Pre';
import metadata from '@/configs/metadata';

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
    path,
    images,
    body: { code },
  } = post;
  const url = metadata.fqdn + path;
  const MDXContent = useMDXComponent(code);

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
