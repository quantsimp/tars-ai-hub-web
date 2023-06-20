import { CodeBlock } from '@/components/ai-code-converter/CodeBlock';
import { LanguageSelect } from '@/components/ai-code-converter/LanguageSelect';
import { TextBlock } from '@/components/ai-code-converter/TextBlock';
import AppLayout from '@/layouts/app-layout';
import { OpenAIModel, TranslateBody } from '@/utils/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('JavaScript'); //default lang Input
  const [outputLanguage, setOutputLanguage] = useState<string>('Python'); //default lang output
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [model] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const apiKey = '*'; // :)

  const handleTranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (!apiKey) {
      alert('Please enter an API key.');
      return;
    }

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    };

    console.log(body);

    const response = await fetch('https://api.salimcan.com/api/codeai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;
    console.log(data);
    console.log(data);
    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
    if (hasTranslated) {
      handleTranslate();
    }
  }, [outputLanguage]);

  return (
    <AppLayout>
      <div className='flex h-full min-h-screen flex-col items-center bg-[#080E0B] px-4 pb-20 text-neutral-200 sm:px-10'>
        <div className='mt-5 flex flex-col items-center justify-center sm:mt-10'>
          <div className='text-4xl font-bold'>AI Code Converter</div>
        </div>

        <div className='mt-5 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4'>
          <div className='h-100 flex flex-col justify-center space-y-2 sm:w-2/4'>
            <div className='text-center text-xl font-bold'>Input</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                setInputCode('');
                setOutputCode('');
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
          <div className='mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4'>
            <div className='text-center text-xl font-bold'>Output</div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode('');
              }}
            />

            {outputLanguage === 'Natural Language' ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>
        <div className='mt-5 flex items-center space-x-2'>
          <button
            className='text-color-black w-[220px] cursor-pointer rounded-md bg-primary/90 px-4 py-4 font-bold text-black hover:bg-primary/100 active:bg-primary/100'
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? 'Converting...' : 'Convert Successful!'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
