import { computePosition } from '@floating-ui/dom';
import { $isLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import clsx from 'clsx';
import { $getSelection, FORMAT_TEXT_COMMAND, LexicalEditor } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as InsertLinkIcon } from '@/assets/icons/insert-link.svg';
import { useUserInteractions } from '@/hooks';

import { $isRangeSelected } from '../../utils/isRangeSelected';
import { TOGGLE_EDIT_LINK_MENU } from '../EditLinkPlugin';

type FloatingMenuPosition = { x: number; y: number } | undefined;

type FloatingMenuProps = {
  editor: LexicalEditor;
  show: boolean;
  isBold: boolean;
  isCode: boolean;
  isLink: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

function FloatingMenu({ show, ...props }: FloatingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<FloatingMenuPosition>(undefined);

  const nativeSel = window.getSelection();

  useEffect(() => {
    const isCollapsed = nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed;

    if (!show || !ref.current || !nativeSel || isCollapsed) {
      setPos(undefined);
      return;
    }
    const domRange = nativeSel.getRangeAt(0);

    computePosition(domRange, ref.current, { placement: 'top-start' })
      .then((pos) => {
        setPos({ x: pos.x, y: pos.y - 10 });
      })
      .catch(() => {
        setPos(undefined);
      });
    // anchorOffset, so that we sync the menu position with
    // native selection (if user selects two ranges consecutively)
  }, [show, nativeSel, nativeSel?.anchorOffset]);

  return (
    <div
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      aria-hidden={!pos?.x || !pos?.y}
      className={`absolute z-50 flex h-10 items-stretch justify-between gap-1 rounded-md border border-gray-200 bg-white p-1 font-medium shadow-[0px_6px_10px_rgba(0,0,0,0.2)] ${
        pos?.x && pos.y ? 'opacity-1 visible' : 'invisible opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={clsx(
          'w-8 rounded px-2 text-base hover:bg-gray-200',
          props.isBold ? 'bg-gray-200 font-bold text-gray-900' : 'font-semibold text-gray-600'
        )}
        aria-label="Format text as bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={clsx(
          'w-8 rounded px-2 italic hover:bg-gray-200',
          props.isItalic ? 'bg-gray-200 font-bold text-gray-900' : 'text-gray-600'
        )}
        aria-label="Format text as italics"
      >
        {ActionIcons.Italic}
      </button>
      <button
        type="button"
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={clsx(
          'w-8 rounded px-2 text-sm underline hover:bg-gray-200',
          props.isUnderline ? 'bg-gray-200 font-bold text-gray-900' : 'text-gray-600'
        )}
        aria-label="Format text to underlined"
      >
        {ActionIcons.Underline}
      </button>
      <button
        type="button"
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={clsx(
          'w-8 rounded px-2 text-sm line-through hover:bg-gray-200',
          props.isStrikethrough ? 'bg-gray-200 font-bold text-gray-900' : 'text-gray-600'
        )}
        aria-label="Format text with a strikethrough"
      >
        T
      </button>
      <button
        type="button"
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
        className={clsx(
          'w-8 rounded px-2 text-sm hover:bg-gray-200',
          props.isCode ? 'bg-gray-200 font-bold text-gray-900' : 'text-gray-600'
        )}
        aria-label="Insert code block"
      >
        {ActionIcons.Code}
      </button>
      <button
        type="button"
        onClick={() => {
          props.editor.dispatchCommand(TOGGLE_EDIT_LINK_MENU, undefined);
        }}
        className={clsx(
          'w-8 rounded px-2 text-sm line-through hover:bg-gray-200',
          props.isLink ? 'bg-gray-200 font-bold text-gray-900' : 'text-gray-600'
        )}
        aria-label="Insert link"
      >
        <InsertLinkIcon />
      </button>
    </div>
  );
}

export function FloatingTextFormatToolbarPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}) {
  const [show, setShow] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const { isPointerDown, isKeyDown } = useUserInteractions();
  const [editor] = useLexicalComposerContext();

  const updateFloatingMenu = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing() || isPointerDown || isKeyDown) return;

      if (editor.getRootElement() !== document.activeElement) {
        setShow(false);
        return;
      }

      const selection = $getSelection();

      if ($isRangeSelected(selection)) {
        const nodes = selection.getNodes();
        setIsBold(selection.hasFormat('bold'));
        setIsCode(selection.hasFormat('code'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsLink(nodes.every((node) => $isLinkNode(node.getParent())));
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [editor, isPointerDown, isKeyDown]);

  // Rerender the floating menu automatically on every state update.
  // Needed to show correct state for active formatting state.
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updateFloatingMenu();
    });
  }, [editor, updateFloatingMenu]);

  // Rerender the floating menu on relevant user interactions.
  // Needed to show/hide floating menu on pointer up / key up.
  useEffect(() => {
    updateFloatingMenu();
  }, [isPointerDown, isKeyDown, updateFloatingMenu]);

  return createPortal(
    <FloatingMenu
      editor={editor}
      show={show}
      isBold={isBold}
      isCode={isCode}
      isLink={isLink}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isUnderline={isUnderline}
    />,
    anchorElem
  );
}

const ActionIcons = {
  Underline: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-icon="underline"
      className="h-3.5 w-3.5"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
      />
    </svg>
  ),
  Italic: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-icon="italic"
      className="h-3.5 w-3.5"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="currentColor"
        d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"
      />
    </svg>
  ),
  Code: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
      <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
    </svg>
  ),
};
