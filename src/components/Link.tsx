import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

const CustomLink = ({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<'a'>) => {
  const isInternalLink =
    (href && href.startsWith('/')) || typeof href === 'object';

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const isAnchorLink = href && href.startsWith('#');

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  );
};

export default CustomLink;
