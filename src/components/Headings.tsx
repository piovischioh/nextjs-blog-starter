import type { ComponentPropsWithoutRef } from 'react';

import Link from './Link';

interface PropsType
  extends ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  Component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = ({ id, children, Component, ...props }: PropsType) => (
  <Component id={id} {...props}>
    <Link
      href={`#${id}`}
      className="relative no-underline after:absolute after:top-1/2 after:ml-2 after:hidden after:h-6 after:w-6 after:-translate-y-1/2 after:items-center after:justify-center after:rounded-md after:border after:border-primary-600 after:text-base after:text-primary-600 after:duration-300 after:content-['#'] hover:after:inline-flex dark:after:border-primary-400 dark:after:text-primary-400"
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, '', `#${id}`);
        document.querySelector(`#${id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }}
    >
      {children}
    </Link>
  </Component>
);

export default {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <Heading Component="h1" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <Heading Component="h2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <Heading Component="h3" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <Heading Component="h4" {...props} />
  ),
  h5: (props: ComponentPropsWithoutRef<'h5'>) => (
    <Heading Component="h5" {...props} />
  ),
  h6: (props: ComponentPropsWithoutRef<'h6'>) => (
    <Heading Component="h6" {...props} />
  ),
};
