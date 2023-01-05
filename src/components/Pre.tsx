import type { ComponentPropsWithoutRef } from 'react';
import { useCallback, useState, useRef } from 'react';

const Pre = ({ children }: ComponentPropsWithoutRef<'pre'>) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (!textInput.current?.textContent) return;

    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, []);

  return (
    <div ref={textInput} className="group relative">
      <button
        aria-label="Copy code"
        type="button"
        className={`absolute right-2 top-2 hidden h-8 w-8 rounded border-2 bg-gray-700 p-1 duration-500 group-hover:block dark:bg-gray-800 ${
          copied
            ? 'border-primary-400 focus:border-primary-400 focus:outline-none'
            : 'border-gray-300'
        }`}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className={copied ? 'text-primary-400' : 'text-gray-300'}
        >
          {copied ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          )}
        </svg>
      </button>

      <pre>{children}</pre>
    </div>
  );
};

export default Pre;
