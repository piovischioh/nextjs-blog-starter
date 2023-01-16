import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Tag from '@/components/Tag';
import getTags from '@/utils/getTags';

export interface PropsType {
  tags: {
    [tag: string]: number;
  };
  sortedTags: string[];
}

export const getStaticProps: GetStaticProps<PropsType> = async () => ({
  props: { ...getTags() },
});

const PostsPage: NextPage<PropsType> = ({ tags, sortedTags }: PropsType) => (
  <>
    <NextSeo title="Tags" />

    <div className="mx-auto flex max-w-lg flex-col items-center divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {!Object.keys(tags).length ? (
          <div className="p-5 text-center text-2xl font-bold">No Tags</div>
        ) : (
          sortedTags.map((t) => (
            <div key={t} className="my-2 mr-5">
              <Tag text={t} quantity={tags[t]} />
            </div>
          ))
        )}
      </div>
    </div>
  </>
);

export default PostsPage;
