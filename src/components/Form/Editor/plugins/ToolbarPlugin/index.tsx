import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';
import { $isLinkNode } from '@lexical/link';
import {
  $isListNode,
  // INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRootOrShadowRoot,
  $isParagraphNode,
  CLEAR_EDITOR_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  UNDO_COMMAND,
  NodeKey,
  $getNodeByKey,
} from 'lexical';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ReactComponent as AttachmentIcon } from '@/assets/icons/attachment.svg';
import { ReactComponent as InsertLinkIcon } from '@/assets/icons/insert-link.svg';
import { ReactComponent as BulletListIcon } from '@/assets/icons/list-bulleted.svg';
import { ReactComponent as NumberListIcon } from '@/assets/icons/list-numbered.svg';
import { DropDown } from '@/components/Elements';
import config from '@/config';
import { useModal } from '@/hooks';

import { useSharedHistoryContext } from '../../context/SharedHistoryContext';
import { $isRangeSelected } from '../../utils/isRangeSelected';
import { TOGGLE_EDIT_LINK_MENU } from '../EditLinkPlugin';
import { InsertImageDialog } from '../ImagesPlugin';

const IS_APPLE = config.IS_APPLE;
const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};
function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { historyState } = useSharedHistoryContext();

  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  const { undoStack, redoStack } = historyState ?? {};
  const [hasUndo, setHasUndo] = useState(undoStack?.length !== 0);
  const [hasRedo, setHasRedo] = useState(redoStack?.length !== 0);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const [codeLanguage, setCodeLanguage] = useState<string>('');

  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelected(selection)) {
      const nodes = selection.getNodes();
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsCode(selection.hasFormat('code'));
      setIsLink(nodes.every((node) => $isLinkNode(node.getParent())));

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '');
            return;
          }
        }
      }
    }
  }, [editor]);

  const MandatoryPlugins = useMemo(() => {
    return <ClearEditorPlugin />;
  }, []);

  useEffect(
    function checkEditorEmptyState() {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const root = $getRoot();
          const children = root.getChildren();

          if (children.length > 1) {
            setIsEditorEmpty(false);
            return;
          }

          if ($isParagraphNode(children[0])) {
            setIsEditorEmpty(children[0].getChildren().length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        });
      });
    },
    [editor]
  );

  // useEffect(() => {
  //   return editor.registerCommand(
  //     SELECTION_CHANGE_COMMAND,
  //     (_payload, newEditor) => {
  //       updateToolbar();
  //       editor.setEditorState(newEditor._editorState);
  //       // setActiveEditor(newEditor);
  //       return false;
  //     },
  //     COMMAND_PRIORITY_CRITICAL
  //   );
  // }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  useEffect(
    function checkEditorHistoryActions() {
      return editor.registerUpdateListener(() => {
        setHasRedo(redoStack?.length !== 0);
        setHasUndo(undoStack?.length !== 0);
      });
    },
    [editor, undoStack, redoStack]
  );

  return (
    <>
      {MandatoryPlugins}
      <div className="inline-flex flex-wrap items-center gap-1">
        <button
          type="button"
          disabled={isEditorEmpty}
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          }}
          className={clsx(
            'flex cursor-pointer items-center justify-center rounded-md p-1 text-base transition-colors hover:bg-gray-200 ',
            'font-bold'
          )}
        >
          {ActionIcons.Clear}
        </button>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={!hasUndo}
            onClick={() => {
              editor.dispatchCommand(UNDO_COMMAND, undefined);
            }}
            title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
            className={clsx(
              'flex cursor-pointer items-center justify-center rounded-md p-1.5 text-base transition-colors hover:bg-gray-200 ',
              'font-bold'
            )}
            aria-label="Undo"
          >
            {ActionIcons.Undo}
          </button>
          <button
            type="button"
            disabled={!hasRedo}
            onClick={() => {
              editor.dispatchCommand(REDO_COMMAND, undefined);
            }}
            title={IS_APPLE ? 'Redo (⇧+⌘Z)' : 'Redo (Ctrl+Y)'}
            className={clsx(
              'flex cursor-pointer items-center justify-center rounded-md  p-1.5 text-base transition-colors hover:bg-gray-200 ',
              'font-bold'
            )}
            aria-label="Redo"
          >
            {ActionIcons.Redo}
          </button>
        </div>
        {blockType in blockTypeToBlockName && editor && (
          <>
            <BlockFormatDropDown disabled={!isEditable} blockType={blockType} editor={editor} />
          </>
        )}
        <>
          {blockType === 'code' ? (
            <CodeBlockDropDown
              editor={editor}
              codeLanguage={codeLanguage}
              disabled={!isEditable}
              selectedElementKey={selectedElementKey}
            />
          ) : (
            <>
              <TextFormat
                editor={editor}
                disabled={!isEditable}
                isBold={isBold}
                isCode={isCode}
                isItalic={isItalic}
                isStrikethrough={isStrikethrough}
                isUnderline={isUnderline}
                isLink={isLink}
              />

              <AttachmentDropDown editor={editor} disabled={!isEditable} />
            </>
          )}
        </>
      </div>
    </>
  );
};

function dropDownActiveClass(active: boolean) {
  if (active) return 'bg-blue-100 dark:bg-blue-500 font-semibold text-blue-500 dark:text-white';
  else return '';
}

function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelected(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelected(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  // const formatCheckList = () => {
  //   if (blockType !== 'check') {
  //     editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  //   } else {
  //     editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  //   }
  // };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelected(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        let selection = $getSelection();

        if ($isRangeSelected(selection)) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelected(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };

  return (
    <DropDown
      disabled={disabled}
      placement="bottom"
      trigger={() => (
        <span className="cursor-pointer rounded-md p-1 text-sm font-medium transition-colors hover:bg-gray-200 ">
          {blockTypeToBlockName[blockType]}
        </span>
      )}
      // className="max-w-56"
      aria-label="Formatting options for text style"
    >
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-56 p-2', dropDownActiveClass(blockType === 'paragraph'))}
        onClick={formatParagraph}
      >
        <span className="mr-2 h-6 w-6 font-extralight text-gray-700 dark:text-gray-300 ">P</span>
        <span className="text-sm">Normal</span>
      </DropDown.Item>
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'h1'))}
        onClick={() => formatHeading('h1')}
      >
        <span className="mr-2 h-6 w-6 font-extralight text-gray-700 dark:text-gray-300">H1</span>
        <span className="text-sm">Heading 1</span>
      </DropDown.Item>
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'h2'))}
        onClick={() => formatHeading('h2')}
      >
        <span className="mr-2 h-6 w-6 font-extralight text-gray-700 dark:text-gray-300">H2</span>
        <span className="text-sm">Heading 2</span>
      </DropDown.Item>
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'h3'))}
        onClick={() => formatHeading('h3')}
      >
        <span className="mr-2 h-6 w-6 font-extralight text-gray-700 dark:text-gray-300">H3</span>
        <span className="text-sm">Heading 3</span>
      </DropDown.Item>
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'bullet'))}
        onClick={formatBulletList}
      >
        <BulletListIcon className="mr-2 h-6 w-6 p-1 font-extralight text-gray-400" />
        <span className="text-sm">Bullet List</span>
      </DropDown.Item>
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'number'))}
        onClick={formatNumberedList}
      >
        <NumberListIcon className="mr-2 h-6 w-6 p-1 font-extralight text-gray-400" />
        <span className="text-sm">Numbered List</span>
      </DropDown.Item>
      {/* <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'check'))}
        onClick={formatCheckList}
      >
        <span className="flex items-center font-extralight w-6 h-6 my-auto mr-2 text-gray-400">
          <svg
            className="font-extralight text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
          </svg>
        </span>

        <span className="text-sm">Check List</span>
      </DropDown.Item> */}
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'quote'))}
        onClick={formatQuote}
      >
        <span className="mr-2 h-6 w-6 text-4xl font-extralight text-gray-700 dark:text-gray-300">
          &ldquo;
        </span>
        <span className="text-sm">Quote</span>
      </DropDown.Item>
      <DropDown.Item
        type="button"
        as="button"
        className={clsx('flex w-full p-2', dropDownActiveClass(blockType === 'code'))}
        onClick={formatCode}
      >
        <span className="my-auto mr-2 flex h-6 w-6 items-center font-extralight text-gray-400">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
          </svg>
        </span>
        <span className="text-sm">Code Block</span>
      </DropDown.Item>
    </DropDown>
  );
}

function TextFormat({
  editor,
  disabled,
  isBold,
  isItalic,
  isCode,
  isUnderline,
  isLink,
}: {
  editor: LexicalEditor;
  disabled: boolean;
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
  isLink: boolean;
}) {
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={clsx(
          'flex h-6 w-7 items-center justify-center rounded-sm text-base hover:bg-gray-300',
          isBold ? 'bg-gray-300 font-bold text-black' : 'font-bold text-gray-600'
        )}
        title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
        aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'}`}
      >
        B
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={clsx(
          'flex h-6 w-7 items-center justify-center rounded-sm text-base underline hover:bg-gray-300',
          isUnderline ? 'bg-gray-300 font-bold text-black' : 'font-bold text-gray-600'
        )}
        title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
        aria-label={`Format text to underlined. Shortcut: ${IS_APPLE ? '⌘U' : 'Ctrl+U'}`}
      >
        {ActionIcons.Underline}
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={clsx(
          'flex h-6 w-7 items-center justify-center rounded-sm text-base italic hover:bg-gray-300',
          isItalic ? 'bg-gray-300 font-bold text-black' : 'font-bold text-gray-600'
        )}
        title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
        aria-label={`Format text as italics. Shortcut: ${IS_APPLE ? '⌘I' : 'Ctrl+I'}`}
      >
        {ActionIcons.Italic}
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
        className={clsx(
          'text-bas hidden h-6 w-7 items-center justify-center rounded-sm hover:bg-gray-300',
          isCode ? 'bg-gray-300 font-bold text-black' : 'font-bold text-gray-600'
        )}
        title="Insert code block"
        aria-label="Insert code block"
      >
        {ActionIcons.Code}
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(TOGGLE_EDIT_LINK_MENU, undefined);
        }}
        className={clsx(
          'flex h-6 w-7 items-center justify-center rounded-sm text-base hover:bg-gray-300',
          isLink ? 'bg-gray-300 font-bold text-black' : 'font-bold text-gray-600'
        )}
        aria-label="Insert link"
      >
        <InsertLinkIcon />
      </button>
    </>
  );
}

function CodeBlockDropDown({
  editor,
  codeLanguage,
  disabled,
  selectedElementKey,
}: {
  editor: LexicalEditor;
  codeLanguage: string;
  disabled: boolean;
  selectedElementKey: NodeKey | null;
}) {
  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  return (
    <DropDown
      disabled={disabled}
      placement="bottom"
      trigger={() => (
        <span className="cursor-pointer rounded-md p-1 text-sm font-medium transition-colors hover:bg-gray-200 ">
          {getLanguageFriendlyName(codeLanguage)}
        </span>
      )}
      // className="max-w-56"
      aria-label="Select language"
    >
      {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
        return (
          <DropDown.Item
            as="button"
            type="button"
            className={clsx('flex w-full p-2', dropDownActiveClass(value === codeLanguage))}
            onClick={() => onCodeLanguageSelect(value)}
            key={value}
          >
            <span className="text">{name}</span>
          </DropDown.Item>
        );
      })}
    </DropDown>
  );
}

function AttachmentDropDown({ editor, disabled }: { editor: LexicalEditor; disabled: boolean }) {
  const [modalContent, setMoodalContent] = useModal();
  return (
    <>
      <DropDown
        disabled={disabled}
        // className="w-6 h-6"
        placement="bottom"
        trigger={() => (
          <AttachmentIcon className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md p-1 transition-colors" />
        )}
        showIcon={false}
        aria-label="Insert specialized editor node"
      >
        <DropDown.Item
          type="button"
          as="button"
          onClick={() => {
            editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
          }}
          className="flex w-56 p-2"
        >
          <span className="my-auto mr-2 flex h-6 w-6 items-center font-extralight text-gray-400">
            {ActionIcons.HorizontalRule}
          </span>
          <span className="text-sm">Horizontal Rule</span>
        </DropDown.Item>
        <DropDown.Item
          type="button"
          as="button"
          onClick={() => {
            setMoodalContent({
              title: 'Insert Image',
              showModal(onClose: any) {
                return <InsertImageDialog activeEditor={editor} onClose={onClose} />;
              },
              options: {
                variant: 'rounded-md',
                position: 'top',
              },
            });
          }}
          className="hidden w-56 p-2"
        >
          <span className="my-auto mr-2 flex h-6 w-6 items-center font-extralight text-gray-400">
            {ActionIcons.Image}
          </span>
          <span className="text-sm">Image</span>
        </DropDown.Item>

        {/* <DropDown.Item
          type="button"
          as="button"
          onClick={() => {
            editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
          }}
          className="flex p-2 w-56"
        >
          <span className="flex items-center font-extralight w-6 h-6 my-auto mr-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-right-fill"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </span>{' '}
          <span className="text-sm">Collapsible container</span>
        </DropDown.Item> */}
      </DropDown>
      {modalContent}
    </>
  );
}

const ActionIcons = {
  Clear: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <title>Clear</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
      />
    </svg>
  ),
  Undo: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-icon="rotate-left"
      className="h-3.5 w-3.5"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"
      />
    </svg>
  ),
  Redo: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-icon="rotate-right"
      className="h-3.5 w-3.5"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
      />
    </svg>
  ),
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
  Image: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-file-image"
    >
      <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
    </svg>
  ),
  HorizontalRule: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
      <path d="M0 10.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zM12 0H4a2 2 0 0 0-2 2v7h1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7h1V2a2 2 0 0 0-2-2zm2 12h-1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2H2v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2z" />
    </svg>
  ),
};
