/* eslint-disable react-refresh/only-export-components */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import './index.css';

import {
  $isCodeNode,
  CodeNode,
  // normalizeCodeLang,
  getLanguageFriendlyName,
} from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { debounce } from '../../utils/debounce';

import { CopyButton } from './CopyButton';

const CODE_PADDING = 8;

interface Position {
  top: string;
  right: string;
}

function CodeActionMenuContainer({ anchorElem }: { anchorElem: HTMLElement }): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const [lang, setLang] = useState('');
  const [isShown, setShown] = useState<boolean>(false);
  const [shouldListenMouseMove, setShouldListenMouseMove] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    right: '0',
    top: '0',
  });
  const codeSetRef = useRef<Set<string>>(new Set());
  const codeDOMNodeRef = useRef<HTMLElement | null>(null);

  function getCodeDOMNode(): HTMLElement | null {
    return codeDOMNodeRef.current;
  }

  const debouncedOnMouseMove = debounce((event: MouseEvent) => {
    const { codeDOMNode, isOutside } = getMouseInfo(event);
    if (isOutside) {
      setShown(false);
      return;
    }

    if (!codeDOMNode) {
      return;
    }

    codeDOMNodeRef.current = codeDOMNode;

    let codeNode: CodeNode | null = null;
    let _lang = '';

    editor.update(() => {
      const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode);

      if ($isCodeNode(maybeCodeNode)) {
        codeNode = maybeCodeNode;
        _lang = codeNode.getLanguage() || '';
      }
    });

    if (codeNode) {
      const { y: editorElemY, right: editorElemRight } = anchorElem.getBoundingClientRect();
      const { y, right } = codeDOMNode.getBoundingClientRect();
      setLang(_lang);
      setShown(true);
      setPosition({
        right: `${editorElemRight - right + CODE_PADDING}px`,
        top: `${y - editorElemY}px`,
      });
    }
  }, 50);
  useEffect(() => {
    if (!shouldListenMouseMove) {
      return;
    }

    document.addEventListener('mousemove', debouncedOnMouseMove);

    return () => {
      setShown(false);
      document.removeEventListener('mousemove', debouncedOnMouseMove);
    };
  }, [shouldListenMouseMove, debouncedOnMouseMove]);

  editor.registerMutationListener(CodeNode, (mutations) => {
    editor.getEditorState().read(() => {
      for (const [key, type] of mutations) {
        switch (type) {
          case 'created':
            codeSetRef.current.add(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          case 'destroyed':
            codeSetRef.current.delete(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          default:
            break;
        }
      }
    });
  });
  // const normalizedLang = normalizeCodeLang(lang);
  const codeFriendlyName = getLanguageFriendlyName(lang);

  return (
    <>
      {isShown ? (
        <div
          className="absolute z-40 -mr-2 -mt-5 flex items-center gap-2 rounded-md bg-[#343446] px-2 py-1"
          style={{ ...position }}
        >
          <span className="text-xs font-medium text-gray-400">{codeFriendlyName}</span>
          <CopyButton editor={editor} getCodeDOMNode={getCodeDOMNode} />
        </div>
      ) : null}
    </>
  );
}

function getMouseInfo(event: MouseEvent): {
  codeDOMNode: HTMLElement | null;
  isOutside: boolean;
} {
  const target = event.target;

  if (target && target instanceof HTMLElement) {
    const codeDOMNode = target.closest<HTMLElement>('code.EditorTheme__code');
    const isOutside = !(
      codeDOMNode || target.closest<HTMLElement>('div.code-action-menu-container')
    );

    return { codeDOMNode, isOutside };
  } else {
    return { codeDOMNode: null, isOutside: true };
  }
}

export function CodeActionMenuPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): React.ReactPortal | null {
  return createPortal(<CodeActionMenuContainer anchorElem={anchorElem} />, anchorElem);
}

export * from './CodeHighlightPlugin';
