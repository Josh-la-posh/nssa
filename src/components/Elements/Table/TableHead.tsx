import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';

import { Button } from '../Button';

import { useTableContextData } from './Table';

export const TableHead = () => {
  const { column, action, isLoading, isFetching } = useTableContextData();
  return (
    <thead className="bg-blue-100 capitalize text-blue-600">
      <tr>
        {column?.map(({ sortFn, accessor, title }) => (
          <th
            key={accessor}
            scope="col"
            className="whitespace-nowrap px-2 py-3 text-base font-semibold"
          >
            {sortFn ? (
              <Button
                disabled={isFetching}
                variant="text"
                endIcon={
                  <span className="flex flex-col justify-center text-gray-500">
                    <ArrowIcon className="w-2 -scale-y-100" />
                    <ArrowIcon className="w-2" />
                  </span>
                }
                onClick={() => sortFn(accessor)}
                className="capitalize text-inherit"
              >
                {title}
              </Button>
            ) : (
              title
            )}
          </th>
        ))}
        {!isLoading && action && <th scope="col" className="px-2 py-3"></th>}
      </tr>
    </thead>
  );
};
