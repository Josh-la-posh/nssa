import clsx from 'clsx';
import { createContext, ReactNode, useContext } from 'react';

import { ErrorBoundary } from '@/components/Layout';

import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { TablePagination } from './TablePagination';

type TableProps = {
  title?: ReactNode;
  header?: ReactNode;
  head?: ReactNode;
  body?: ReactNode;
  name?: string;
  tableHeightClass?: string;
  className?: string;
  data?: Record<string, any>[];
  rawData?: Record<string, any>[];
  action?: (data: any) => ReactNode;
  pagination?: ReactNode;
  meta?: {
    page: number;
    count: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
  };
  isLoading?: boolean;
  isFetching?: boolean;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
  column: {
    title: string;
    sortFn?: (key: string) => void;
    wrapper?: (props: any) => JSX.Element;
    accessor: string; // accessor is the "key" in the data
  }[];
};

type TableContextData = {
  data?: Record<string, any>[];
  rawData?: Record<string, any>[];
  isLoading: boolean;
  isFetching?: boolean;
  widthClass?: string;
  action?: (data: any) => ReactNode;
  meta?: {
    page: number;
    count: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
  };
  column: {
    title: string;
    sortFn?: (key: string) => void;
    wrapper?: (props: any) => JSX.Element;
    accessor: string; // accessor is the "key" in the data
  }[];
};

const TableContext = createContext<TableContextData | null>(null);

export const Table = ({
  head,
  body,
  data,
  rawData,
  isLoading = false,
  isFetching = false,
  column,
  action,
  pagination,
  className,
  meta,
  emptyComponent,
  name,
  errorComponent,
}: TableProps) => {
  // const widthClass = '';
  const widthClass = `w-[${100 / Number(column?.length + 1)}%]`;

  return (
    <ErrorBoundary>
      <TableContext.Provider
        value={{
          isLoading,
          isFetching,
          data,
          rawData,
          column,
          action,
          widthClass,
          meta,
        }}
      >
        {!isLoading && (!data || data.length === 0) ? (
          <>{data?.length === 0 ? emptyComponent : errorComponent}</>
        ) : (
          <div>
            <div className={clsx('relative w-full overflow-auto overscroll-x-contain', className)}>
              <table aria-label={name} className="w-full table-auto text-left text-sm">
                {/* <colgroup>
                  {column.map((c) => (
                    <col key={c.accessor} className={widthClass} />
                  ))}
                </colgroup> */}

                {head || <TableHead />}
                {body || <TableBody />}
              </table>
            </div>
            {!isLoading && meta && (pagination || <TablePagination {...meta} />)}
          </div>
        )}
      </TableContext.Provider>
    </ErrorBoundary>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;

export const useTableContextData = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTableContextData must be used within a TableProvider');
  }
  return { ...context };
};
