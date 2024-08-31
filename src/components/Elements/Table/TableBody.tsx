import { ReactNode, useRef } from 'react';

import { Skeleton } from '../Skeleton';

import { useTableContextData } from './Table';

export const TableBody = () => {
  const { data, rawData, isLoading, column, action } = useTableContextData();
  const res = isLoading ? new Array(10).fill({}) : data;

  return (
    <tbody>
      {res?.map((item, index) => (
        <tr
          key={index}
          className="border-b last-of-type:border-none hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-blue-600/10"
        >
          {column?.map(({ accessor, wrapper = ({ children }: { children: ReactNode }) => <>
                {children}
              </> }) => {
            const Container = wrapper;
            return (
              <TruncateTooltip isLoading={isLoading} key={accessor} value={item?.[accessor]}>
                {isLoading ? (
                  <Skeleton variant="rounded" />
                ) : (
                  <Container>{item?.[accessor] || '-'}</Container>
                )}
              </TruncateTooltip>
            );
          })}
          {!isLoading && action && rawData && (
            <th scope="col" className="px-3 py-3">
              {action(rawData[index])}
            </th>
          )}
        </tr>
      ))}
    </tbody>
  );
};

type TruncateTooltipProps = {
  children: ReactNode;
  value?: any;
  isLoading?: boolean;
};

function getNodeText(node: any): string {
  if (['string', 'number'].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
  return '';
}

function TruncateTooltip({ children, value }: TruncateTooltipProps) {
  const cellRef = useRef<HTMLTableCellElement>(null);

  const tip = getNodeText(value);
  return (
    <td ref={cellRef} title={tip} className="relative max-w-[10rem] truncate px-4 py-3 font-medium">
      {children}
    </td>
  );
}
