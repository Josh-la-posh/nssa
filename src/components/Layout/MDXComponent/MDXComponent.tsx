import { evaluate } from '@mdx-js/mdx';
import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import clsx from 'clsx';
import React, { useState, Fragment, HTMLAttributes, useEffect, ImgHTMLAttributes } from 'react';
import * as runtime from 'react/jsx-runtime';

import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import { ReactComponent as CopyIcon } from '@/assets/icons/copy.svg';
import { Admonition, Tabs } from '@/components/Elements';

type Heading = HTMLAttributes<HTMLHeadingElement>;
type Paragraph = HTMLAttributes<HTMLParagraphElement>;
type LinkT = HTMLAttributes<HTMLAnchorElement>;
type ULType = HTMLAttributes<HTMLUListElement>;
type LIType = HTMLAttributes<HTMLLIElement>;
type PreType = HTMLAttributes<HTMLPreElement>;
type ImageType = ImgHTMLAttributes<HTMLImageElement>;

const Pre = (props: PreType) => {
  const [isCopied, setIsCopied] = useState(false);
  const childrenArray = React.Children.toArray(props.children);

  async function handleCopyClick() {
    const textContent = childrenArray
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        } else if (React.isValidElement(child) && typeof child.props.children === 'string') {
          return child.props.children;
        }
        return '';
      })
      .join('');

    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(textContent);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } else {
      return document.execCommand('copy', true, textContent);
    }
  }

  return (
    <pre
      {...props}
      className="text-small relative mb-4 w-full overflow-auto whitespace-pre-wrap rounded-md bg-[#343446] p-4 text-white"
    >
      <button
        onClick={handleCopyClick}
        type="button"
        className="absolute right-2 top-1.5 flex items-center gap-1 rounded-md border border-blue-300 bg-inherit px-2 py-1.5 text-sm font-medium text-blue-300"
      >
        {isCopied ? (
          <>
            <CheckIcon />
            <span>Copied</span>
          </>
        ) : (
          <>
            <CopyIcon />
            <span>Copy</span>
          </>
        )}
      </button>
      {props.children}
    </pre>
  );
};

const components = {
  strong: (props: any) => <i {...props} className="font-bold" />,
  h1: (props: Heading) => (
    <h1 id={props.children?.toString()} className="text-2xl font-semibold">
      {props.children}
    </h1>
  ),
  h2: ({ children }: Heading) => (
    <h2
      id={children?.toString().split(' ').join('-').toLocaleLowerCase()}
      className="text-xl font-semibold"
    >
      {children}
    </h2>
  ),
  img: ({ ...props }: ImageType) => <img {...props} src={props.src} alt={props.alt} />,
  h3: ({ children }: Heading) => <h2 className="text-lg font-semibold">{children}</h2>,
  h4: ({ children }: Heading) => <h2 className="base font-semibold">{children}</h2>,
  p: ({ children }: Paragraph) => <p className="text-base font-normal">{children}</p>,
  a: (props: LinkT) => (
    <a {...props} className="underline hover:text-blue-400">
      {props.children}
    </a>
  ),
  code: (props: any) => <code {...props}>{props.children}</code>,
  pre: Pre,
  Admonition,
  ul: ({ children }: ULType) => <ul className="list-disc pl-5">{children}</ul>,
  li: ({ children }: LIType) => <li className="">{children}</li>,
  Tabs,
};
type MDXState = {
  code: string;
  result: any;
  error: unknown;
};

type MDXComponentProps = {
  source: string;
  className?: string;
};

export const MDXComponent = ({ source, className }: MDXComponentProps) => {
  const { state } = useMDX(source.replaceAll(/<img([^>]+)>/g, '<img$1/>'));
  if (!source) {
    return null;
  }

  return (
    <article
      className={clsx(
        'prose inline-block w-full max-w-full prose-h1:text-2xl prose-h1:font-bold prose-pre:bg-[#343446] prose-img:rounded-lg dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-gray-100',
        className
      )}
    >
      <MDX state={state} />
    </article>
  );
};

const MDX = ({ state }: { state: MDXState }) => {
  return (
    <MDXProvider components={components}>
      {state.result && state.result({ components })}
    </MDXProvider>
  );
};

const useMDX = (code: string) => {
  const [state, setState] = useState<{
    code: string;
    result: any;
    error: unknown;
  }>({
    code,
    result: null,
    error: null,
  });

  type Jsx = (type: any, props: any, key?: any) => React.ReactElement;

  const jsx: Jsx = (type, props, key) => {
    return React.createElement(type, props, key);
  };

  async function setConfig(code: string) {
    // const remarkPlugins = [remarkFrontmatter];
    // const rehypePlugins = [rehypeSanitize];

    let result: any = null;

    try {
      const res = await evaluate(code, {
        ...runtime,
        useMDXComponents,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        jsx: jsx,
        jsxs: jsx,
        Fragment,
      });
      result = res.default;

      setState((oldState) => {
        return { ...oldState, code, result, error: null };
      });
    } catch (error) {
      setState((oldState) => {
        return { ...oldState, code, error };
      });
      throw error;
    }
  }
  useEffect(() => {
    setConfig(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  // useCurrentUsermo(() => setConfig(code), []);

  return { state, setConfig };
};
