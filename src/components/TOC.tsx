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
    // IntersectionObserver callback.
    // The current logic iterates through all observed headings (headingElements.current)
    // on each intersection change to find the first one (in DOM order, assuming key order holds)
    // that is currently intersecting the viewport.
    // This has a potential O(H) complexity (H = total number of headings on the page),
    // which might become a performance consideration for pages with a very large number of headings.
    // Future optimization could involve processing only the 'entries' array or maintaining a
    // sorted list of currently visible headings.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          headingElements.current[entry.target.id] = entry;
        });

        const id = Object.keys(headingElements.current).find(
          (key) => headingElements.current[key].isIntersecting,
        );

        if (id) setActiveId(id);
      },
      // As a future UX refinement, IntersectionObserver options like 'rootMargin' or 'threshold'
      // could be used here to fine-tune when a heading is considered "active".
      // For example, to make it active only when it's more centrally located in the viewport.
      // e.g., { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 }
    );

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
