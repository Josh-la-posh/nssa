import { computePosition } from '@floating-ui/react-dom';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, COMMAND_PRIORITY_LOW, createCommand, LexicalCommand } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as DeleteIcon } from '@/assets/icons/bin.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import { useClickOutside } from '@/hooks';

import { $getSharedLinkTarget } from '../../utils/getSharedLinkTarget';

type EditLinkMenuPosition = { x: number; y: number } | undefined;

export const TOGGLE_EDIT_LINK_MENU: LexicalCommand<undefined> = createCommand();

export function EditLinkPluginAction() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<EditLinkMenuPosition>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [hasLink, setHasLink] = useState(false);

  const [editor] = useLexicalComposerContext();

  const resetState = useCallback(() => {
    setValue('');
    setError(false);
    setPos(undefined);
    // editor.focus();
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      TOGGLE_EDIT_LINK_MENU,
      () => {
        const nativeSel = window.getSelection();
        const isCollapsed = nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed;

        if (!!pos?.x || !!pos?.y || !ref.current || !nativeSel || isCollapsed) {
          resetState();
          return false;
        }
        const domRange = nativeSel.getRangeAt(0);

        computePosition(domRange, ref.current, { placement: 'bottom' })
          .then((pos: { x: any; y: number }) => {
            setPos({ x: pos.x, y: pos.y + 10 });
            editor.getEditorState().read(() => {
              const selection = $getSelection();
              const linkTarget = $getSharedLinkTarget(selection);
              setHasLink(!!linkTarget);
            });
          })
          .catch(() => {
            resetState();
          });
        return true;
      },

      COMMAND_PRIORITY_LOW
    );
  }, [editor, pos, resetState]);

  useEffect(() => {
    if (pos?.x && pos?.y) {
      let initialUrl = '';

      editor.getEditorState().read(() => {
        const selection = $getSelection();
        initialUrl = $getSharedLinkTarget(selection) ?? '';
      });

      setValue(initialUrl);
      inputRef.current?.focus();
    }
  }, [pos, editor]);

  useClickOutside(ref, () => {
    resetState();
  });

  const handleSetLink = () => {
    if (!value) return;

    const isLinkSet = editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: value,
      target: '_blank',
    });

    if (isLinkSet) resetState();
    else setError(true);
  };

  const handleRemoveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    resetState();
  };

  return (
    <div
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      aria-hidden={!pos?.x || !pos?.y}
      className={`absolute z-50 flex h-10 items-center justify-between gap-1 rounded-md border border-gray-200 bg-white p-1 font-medium shadow-[0px_6px_10px_rgba(0,0,0,0.2)] ${
        pos?.x && pos.y ? 'opacity-1 visible' : 'invisible opacity-0'
      } ${error ? 'border-red-600' : 'border-slate-300'}`}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-none bg-white px-2 py-1 text-sm font-medium outline-none"
        placeholder="Enter URL"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSetLink();
            return;
          }

          if (e.key === 'Escape') {
            e.preventDefault();
            resetState();
            return;
          }
        }}
      />
      {hasLink ? (
        <button type="button" className="px-1" onClick={handleRemoveLink}>
          <DeleteIcon className="h-4 w-4" />
        </button>
      ) : null}
      <button className="px-1" disabled={!value} type="button" onClick={handleSetLink}>
        <CheckIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export function EditLinkPlugin({ anchorElem = document.body }: { anchorElem?: HTMLElement }) {
  return createPortal(<EditLinkPluginAction />, anchorElem);
}

export * from './OpenLinkPlugin';
