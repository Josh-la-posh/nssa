import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import clsx from 'clsx';
import { EditorState } from 'lexical';
import { forwardRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../FieldWrapper';

import { SharedHistoryContext, useSharedHistoryContext } from './context/SharedHistoryContext';
import { LexicalNodes } from './nodes';
import { AutoLinkPlugin } from './plugins/AutoLinkPlugin';
import { CodeActionMenuPlugin, CodeHighlightPlugin } from './plugins/CodePlugin';
import { EditLinkPlugin, OpenLinkPlugin } from './plugins/EditLinkPlugin';
import { FloatingTextFormatToolbarPlugin } from './plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import { MentionsPlugin } from './plugins/MentionPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { editorTheme } from './theme';
import { validateUrl } from './utils/url';

type TargetType = {
  target: {
    name: string;
    value: string;
  };
};

type EditorComponentProps = FieldWrapperPassThroughProps & {
  registration?: Partial<UseFormRegisterReturn>;
  value?: EditorState | string;
  defaultValue?: string;
  onChange?: (e: TargetType) => void;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  textClassName?: string;
  className?: string;
  isMarkdown?: boolean;
  mentionsList?: { name: string; picture?: string }[];
  placeholder?: string;
  disableImage?: boolean;
  showToolbar?: boolean;
};

const mdxClass =
  'prose-img:rounded-lg first:prose-p:my-0 last:prose-p:mb-0 first:prose-p:mb-2 prose-p:my-2 prose-pre:bg-[#343446] w-full prose prose-h1:font-bold prose-h1:text-2xl dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-gray-100';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EditorComponent = (props: EditorComponentProps, _ref: any) => {
  const {
    placeholder,
    onChange,
    showToolbar = true,
    textClassName,
    className,
    disableImage,
    disabled,
    mentionsList,
    name = '',
    error,
  } = props;

  const { historyState } = useSharedHistoryContext();

  const handleOnchange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      const v = {
        target: {
          name,
          value: markdown,
        },
      };

      if (onChange) {
        onChange(v);
      }
    });
  };

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement>();

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <>
      <div className="relative w-full bg-inherit" ref={onRef}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              disabled={disabled}
              className={clsx(
                'min-h-[120px] max-w-full overflow-auto rounded-md !border border-gray-400 p-3 pb-11 placeholder-gray-800 outline-0 hover:border-blue-400 focus:border focus:outline-none',
                mdxClass,
                className,
                error && 'border-status-error focus:border-status-error'
              )}
            />
          }
          placeholder={
            <span
              className={clsx(
                'pointer-events-none absolute top-0 p-3 text-gray-500',
                textClassName
              )}
            >
              {placeholder}
            </span>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {showToolbar && (
          <div className="absolute bottom-0 left-0 w-full rounded-b-md border border-t-0 border-gray-400 bg-white p-1 dark:bg-blue-600">
            <ToolbarPlugin />
          </div>
        )}
      </div>
      {mentionsList && <MentionsPlugin mentionsList={mentionsList} />}
      <ListPlugin />
      <LinkPlugin validateUrl={validateUrl} />
      <AutoLinkPlugin />
      <ClearEditorPlugin />
      <HorizontalRulePlugin />
      <TabFocusPlugin />

      <CheckListPlugin />
      {floatingAnchorElem && (
        <>
          <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
          <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          <EditLinkPlugin anchorElem={floatingAnchorElem} />
          <OpenLinkPlugin />
        </>
      )}

      <CodeHighlightPlugin />
      <CheckListPlugin />
      <TabIndentationPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <AutoFocusPlugin />
      <HistoryPlugin externalHistoryState={historyState} />
      {!disableImage && <ImagesPlugin />}
      <OnChangePlugin onChange={handleOnchange} />
    </>
  );
};

const MyEditorComponent = forwardRef<HTMLDivElement, EditorComponentProps>(EditorComponent);

export const Editor = (props: EditorComponentProps) => {
  const {
    name = '',
    disabled,
    onChange,
    registration,
    label,
    error,
    helperText,

    defaultValue,
  } = props;

  const initialConfig: Parameters<typeof LexicalComposer>['0']['initialConfig'] = {
    namespace: name,
    editable: !disabled,
    onError: (error) => {
      throw error;
    },
    editorState: () => $convertFromMarkdownString(defaultValue || '', TRANSFORMERS),
    nodes: LexicalNodes,
    theme: editorTheme,
  };

  const handleOnchange = (e: TargetType) => {
    if (registration?.onChange) {
      registration.onChange(e);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative bg-inherit ">
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <FieldWrapper label={label} id={name} name={name} error={error} helperText={helperText}>
            <MyEditorComponent
              {...props}
              {...registration}
              name={props.id}
              onChange={handleOnchange}
            />
          </FieldWrapper>
        </SharedHistoryContext>
      </LexicalComposer>
    </div>
  );
};
