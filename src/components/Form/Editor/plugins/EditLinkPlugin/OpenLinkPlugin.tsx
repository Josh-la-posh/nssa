import { computePosition } from '@floating-ui/dom';
import { LinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef, useState } from 'react';

import { ReactComponent as CopyIcon } from '@/assets/icons/copy.svg';

import { debounce } from '../../utils/debounce';

type OpenLinkMenuPosition = { x: number; y: number } | undefined;

const LINK_SELECTOR = `[data-lexical-editor] a`;
const OPEN_LINK_MENU_ID = 'open-link-menu';

export function OpenLinkPlugin() {
  const ref = useRef<HTMLDivElement>(null);
  const linkSetRef = useRef<Set<string>>(new Set());

  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [pos, setPos] = useState<OpenLinkMenuPosition>(undefined);
  const [link, setLink] = useState<string | null>(null);

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const menu = (e.target as HTMLElement).closest<HTMLElement>(`#${OPEN_LINK_MENU_ID}`);
      if (menu) return;

      const link = (e.target as HTMLElement).closest<HTMLElement>(LINK_SELECTOR);

      if (!link || !ref.current) {
        setPos(undefined);
        setLink(null);
        return;
      }

      computePosition(link, ref.current, { placement: 'bottom-start' })
        .then((pos) => {
          setPos({ x: pos.x, y: pos.y + 10 });
          setLink(link.getAttribute('href'));
        })
        .catch(() => {
          setPos(undefined);
        });

      return true;
    };

    const debouncedMouseMove = debounce(handleMouseMove, 200);

    return editor.registerMutationListener(LinkNode, (mutations) => {
      for (const [key, type] of mutations) {
        switch (type) {
          case 'created':
          case 'updated':
            linkSetRef.current.add(key);
            if (linkSetRef.current.size === 1)
              document.addEventListener('mousemove', debouncedMouseMove);
            break;

          case 'destroyed':
            linkSetRef.current.delete(key);
            if (linkSetRef.current.size === 0)
              document.removeEventListener('mousemove', debouncedMouseMove);
            break;
        }
      }
    });
  }, [editor, pos]);

  return (
    <div
      id={OPEN_LINK_MENU_ID}
      ref={ref}
      style={{ top: pos?.y, left: pos?.x, width }}
      aria-hidden={!pos?.x || !pos?.y}
      className={`min-h-10 absolute z-50 flex min-w-[120px] justify-between gap-1 rounded-md border border-gray-200 bg-white p-1 font-medium shadow-[0px_6px_10px_rgba(0,0,0,0.2)] ${
        pos?.x && pos.y ? 'opacity-1 visible' : 'invisible opacity-0'
      }`}
    >
      {link && !copied ? (
        <a
          className="inline-block cursor-pointer px-1 text-sm font-medium opacity-75"
          href={link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link}
        </a>
      ) : (
        <span className="w-full cursor-pointer text-center text-xs opacity-75">
          {copied ? '🎉 Copied!' : 'No link'}
        </span>
      )}
      {link ? (
        <button
          type="button"
          className="px-1"
          onClick={() => {
            navigator.clipboard.writeText(link);
            setCopied(true);
            setWidth(ref.current?.getBoundingClientRect().width);
            setTimeout(() => {
              setCopied(false);
              setWidth(undefined);
            }, 1000);
          }}
        >
          <CopyIcon className="h-4 w-4" />
        </button>
      ) : undefined}
    </div>
  );
}
