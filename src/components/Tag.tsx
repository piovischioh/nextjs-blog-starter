import { slug } from 'github-slugger';

import Link from '@/components/Link';

const Tag = ({ text, quantity }: { text: string; quantity?: number }) => (
  <Link
    href={`/tags/${slug(text)}`}
    className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
  >
    {text.split(' ').join('-')}
    {!quantity ? null : (
      <span className="ml-1 font-semibold text-gray-600 dark:text-gray-300">
        ({quantity})
      </span>
    )}
  </Link>
);

export default Tag;
