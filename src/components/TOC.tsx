import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import headingsResolver from '@/plugin/headings-resolver';
import Link from './Link';

interface PropsType {
  headings: ReturnType<typeof headingsResolver>;
}

const TOC = ({ headings }: PropsType) => {
  const headingElements = useRef<{
    [id: string]: IntersectionObserverEntry;
  }>({});
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        headingElements.current[entry.target.id] = entry;
      });

      const id = Object.keys(headingElements.current).find(
        (key) => headingElements.current[key].isIntersecting,
      );

      if (id) setActiveId(id);
    });

    Array.from(document.querySelectorAll('article h2,h3')).forEach((element) =>
      observer.observe(element),
    );

    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <aside className="hidden lg:col-span-1 lg:block">
      <nav className="text-gray-600 dark:text-gray-400 lg:sticky lg:top-6">
        <p className="mb-5 text-lg font-semibold">Table Of Content</p>
        <div className="flex flex-col items-start justify-start space-y-3 border-l-2 border-gray-600 pl-2 dark:border-gray-400">
          {headings.map(({ text, url, primary }) => (
            <Link
              key={text}
              href={url}
              className={clsx(
                'text-sm hover:underline',
                primary ? null : 'pl-4',
                `#${activeId}` !== url
                  ? null
                  : 'text-primary-600 dark:text-primary-400',
              )}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', url);
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
};

export default TOC;
