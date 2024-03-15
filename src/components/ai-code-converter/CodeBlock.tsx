import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { material } from './theme';
import CodeMirror from '@uiw/react-codemirror';
import { FC, useEffect, useState } from 'react';
import { EditorView } from "@codemirror/view"

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({ code, editable = false, onChange = () => {} }) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className='relative'>
      <button
        className='absolute right-0 top-0 z-10 rounded bg-primary p-1 text-xs text-black hover:bg-[#FFFFFF] active:bg-primary '
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>

      <CodeMirror
        editable={editable}
        value={code}
        minHeight='400px'
        extensions={[StreamLanguage.define(go), EditorView.lineWrapping]}
        theme={material}
        onChange={(value: string) => onChange(value)}
      />
    </div>
  );
};
