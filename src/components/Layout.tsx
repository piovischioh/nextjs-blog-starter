import type { ReactNode } from 'react';

import navLinks from '@/data/navLinks';
import ThemeSwitch from './ThemeSwitch';
import Link from './Link';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
    <div className="flex h-screen flex-col justify-between">
      <header className="flex items-center justify-between py-10">
        <div>
          <Link href="/">
            <div className="flex items-center justify-between">
              <div className="mr-3 text-6xl">👨🏻‍💻</div>
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                My Blog
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
        </div>
      </header>
      <main className="mb-auto">{children}</main>
      {/* <Footer /> */}
    </div>
  </div>
);

export default Layout;
