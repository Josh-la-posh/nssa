/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $isCodeNode } from '@lexical/code';
import clsx from 'clsx';
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, LexicalEditor } from 'lexical';
import { useState } from 'react';

import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import { ReactComponent as CopyIcon } from '@/assets/icons/copy.svg';

import { debounce } from '../../utils/debounce';

interface Props {
  editor: LexicalEditor;
  getCodeDOMNode: () => HTMLElement | null;
}

export function CopyButton({ editor, getCodeDOMNode }: Props) {
  const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false);

  const removeSuccessIcon = debounce(() => {
    setCopyCompleted(false);
  }, 1000);

  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode();

    if (!codeDOMNode) {
      return;
    }

    let content = '';

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent();
      }

      const selection = $getSelection();
      $setSelection(selection);
    });

    await navigator.clipboard.writeText(content);
    setCopyCompleted(true);
    removeSuccessIcon();
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      title={isCopyCompleted ? 'Copied' : 'Copy'}
      className={clsx(
        isCopyCompleted ? 'bg-status-success p-1 text-white' : 'border-blue-300 bg-inherit',
        'flex h-5 w-5 items-center justify-center rounded-full py-1 text-xs font-medium text-blue-300 '
      )}
    >
      {isCopyCompleted ? (
        <>
          <CheckIcon />
          {/* <span>Copied</span> */}
        </>
      ) : (
        <>
          <CopyIcon />
          {/* <span>Copy</span> */}
        </>
      )}
    </button>
    // <button className="" onClick={handleClick} aria-label="copy">
    //   {isCopyCompleted ? <i className="format success" /> : <i className="format copy" />}
    // </button>
  );
}
