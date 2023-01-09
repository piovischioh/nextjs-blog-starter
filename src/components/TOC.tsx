import headingsResolver from '@/plugin/headings-resolver';
import Link from './Link';

interface PropsType {
  headings: ReturnType<typeof headingsResolver>;
}

const TOC = ({ headings }: PropsType) => (
  <aside className="hidden lg:col-span-1 lg:block">
    <nav className="lg:sticky lg:top-6">
      <p className="mb-5 text-lg font-semibold text-gray-700 dark:text-gray-200">
        Table Of Content
      </p>
      <div className="flex flex-col items-start justify-start space-y-3 border-l-2 border-gray-700 pl-2 dark:border-gray-400">
        {headings.map(({ text, url, primary }) => (
          <Link
            key={text}
            href={url}
            className={`text-left text-sm hover:underline ${
              !primary ? ' pl-4' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(url)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }}
          >
            {text}
          </Link>
        ))}
      </div>
    </nav>
  </aside>
);

export default TOC;
