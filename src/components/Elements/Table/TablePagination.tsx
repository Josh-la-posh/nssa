import clsx from 'clsx';

import { useTableContextData } from './Table';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';

export interface TablePaginationProps {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { isFetching } = useTableContextData();
  const { count, page, rowsPerPage, onPageChange } = props;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 p-4">
      {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
      </span> */}
      <div>
        {isFetching && <p className="animate-pulse text-sm font-medium">Fetching data...</p>}
      </div>
      <Pagination currentPage={page} onPageChange={onPageChange} totalPages={totalPages} />
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const maxVisiblePages = 3; // Adjust this value to change the number of visible pages

  // Create an array of page numbers to show
  const visiblePages = generateVisiblePages(currentPage, totalPages, maxVisiblePages);

  return (
    <nav aria-label="Table navigation ml-auto">
      <ul className="inline-flex flex-wrap items-center gap-1">
        <li>
          <button
            disabled={prevPage < 1}
            onClick={() => onPageChange(prevPage)}
            className={clsx(
              'first-letter focus:shadow-outline flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors',
              prevPage < 1
                ? 'bg-gray-200 dark:border-gray-500 dark:bg-gray-500'
                : 'border-gray-200 dark:border-gray-500',
              'disabled:cursor-not-allowed'
            )}
          >
            <ArrowIcon className="h-4 w-2.5 rotate-90" />
          </button>
        </li>
        {visiblePages.map((page, index) => (
          <li key={index} className={`mx-1 ${page === currentPage ? 'font-bold' : ''}`}>
            {page === 'ellipsis' ? (
              <span className="mx-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={clsx(
                  'first-letter focus:shadow-outline h-8 min-w-[2rem] rounded-md border p-1 text-sm font-semibold transition-colors',
                  currentPage === page ? 'border-blue-400 text-blue-400' : 'dark:border-gray-500'
                )}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            disabled={nextPage > totalPages}
            onClick={() => onPageChange(nextPage)}
            className={clsx(
              'first-letter focus:shadow-outline flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors',
              nextPage > totalPages
                ? 'bg-gray-200 dark:border-gray-500 dark:bg-gray-500'
                : 'border-gray-200 dark:border-gray-500',
              'disabled:cursor-not-allowed'
            )}
          >
            <ArrowIcon className="h-4 w-2.5 -rotate-90" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

function generateVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
): (number | 'ellipsis')[] {
  const visiblePages: (number | 'ellipsis')[] = [];

  // If there are less pages than the maximum number of visible pages, show all pages
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }

  // Determine the range of pages to show
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage = currentPage - halfMaxVisiblePages;
  let endPage = currentPage + halfMaxVisiblePages;

  if (startPage < 1) {
    startPage = 1;
    endPage = startPage + maxVisiblePages - 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maxVisiblePages + 1;
  }

  // Add the first page
  if (startPage > 1) {
    visiblePages.push(1);
    if (startPage > 2) {
      visiblePages.push('ellipsis'); // Add an ellipsis
    }
  }

  // Add the pages between the first and last visible pages
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // Add the last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      visiblePages.push('ellipsis'); // Add an ellipsis
    }
    visiblePages.push(totalPages);
  }

  return visiblePages;
}
