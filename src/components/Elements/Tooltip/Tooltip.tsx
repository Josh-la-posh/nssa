import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  showCloseButton?: boolean;
};

export const Tooltip = ({ children, className, content }: TooltipProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'computeStyles',
        options: { adaptive: false },
      },
    ],
  });

  if (content) {
    return (
      <div className="group relative">
        <div
          ref={setPopperElement}
          style={styles.popper}
          className={clsx(
            '!rounded bg-blue-100 px-1.5 py-1 text-xs font-semibold leading-none text-blue-600 opacity-0 shadow-sm  transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-200',
            className
          )}
          {...attributes.popper}
        >
          {content}
        </div>
        <div ref={setReferenceElement}>{children}</div>
      </div>
    );
  }
  return <>{children}</>;
};
