import { EditorThemeClasses } from 'lexical';
import './index.css';

export const editorTheme: EditorThemeClasses = {
  //   root: 'p-1 border-slate-500 border-2 rounded h-auto min-h-[140px] focus:outline-none focus-visible:border-black',
  link: 'cursor-pointer text-blue-300',
  hashtag: 'text-blue-500 font-semibold',

  text: {
    bold: 'font-bold',
    underline: 'underline',
    italic: 'italic',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'EditorTheme__textCode font-medium bg-blue-200 p-1 rounded',
  },

  quote:
    'px-4 py-1 text-[15px] rounded-sm border-l-2 not-italic font-medium text-gray-700 border-gray-600 bg-orange-100/30',

  list: {
    listitem: 'EditorTheme__listItem',
    listitemChecked: 'EditorTheme__listItemChecked !not-prose',
    listitemUnchecked: 'EditorTheme__listItemUnchecked !not-prose',
    nested: {
      listitem: 'EditorTheme__nestedListItem',
    },
    olDepth: [
      'EditorTheme__ol1',
      'EditorTheme__ol2',
      'EditorTheme__ol3',
      'EditorTheme__ol4',
      'EditorTheme__ol5',
    ],
    ul: 'EditorTheme__ul',
  },
  code: 'EditorTheme__code relative block overflow-x-auto bg-[#343446] rounded-md py-3 mb-4 px-4 font-medium text-light',

  codeHighlight: {
    atrule: 'text-blue-200',
    attr: 'text-blue-200',
    boolean: 'text-orange-200',
    builtin: 'text-warning-500',
    cdata: 'text-gray-500',
    char: 'text-warning-500',
    class: 'text-blue-300',
    'class-name': 'text-blue-300',
    comment: 'text-gray-600',
    constant: 'text-orange-400',
    deleted: 'text-orange-400',
    doctype: 'text-gray-500',
    entity: 'text-blue-200',
    function: 'text-blue-100',
    important: 'text-blue-200',
    inserted: 'text-warning-500',
    keyword: 'text-blue-300',
    namespace: 'text-blue-200',
    number: 'text-orange-400',
    operator: 'text-blue-200',
    prolog: 'text-gray-500',
    property: 'text-orange-400',
    punctuation: 'text-blue-200',
    regex: 'text-blue-200',
    selector: 'text-warning-500',
    string: 'text-warning-400',
    symbol: 'text-danger-400',
    tag: 'text-gray-400',
    url: 'text-gray-500',
    variable: 'text-blue-200',
  },
};
