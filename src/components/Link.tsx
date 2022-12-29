import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';
import Link from 'next/link';

const CustomLink = ({
  href,
  children,
  ...rest
}: LinkProps & { children: ReactNode; className?: string }) => {
  const isInternalLink = typeof href === 'object' || href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const isAnchorLink = href.startsWith('#');

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
