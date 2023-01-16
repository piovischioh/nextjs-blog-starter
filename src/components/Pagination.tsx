import Link from '@/components/Link';

export interface PropsType {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PropsType) => (
  <div className="flex justify-end pt-6 pb-8">
    <nav className="flex items-center justify-center space-x-3">
      {currentPage === 1 ? null : (
        <Link
          className="text-primary-600 dark:text-primary-500"
          href={currentPage - 1 === 1 ? '/' : `/pages/${currentPage - 1}`}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" />
          </svg>
        </Link>
      )}
      <span>
        {currentPage} / {totalPages}
      </span>
      {currentPage === totalPages ? null : (
        <Link
          className="text-primary-600 dark:text-primary-500"
          href={`/pages/${currentPage + 1}`}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" />
          </svg>
        </Link>
      )}
    </nav>
  </div>
);

export default Pagination;
