import { CodeBlock } from '@/components/ai-code-converter/CodeBlock';
import { LanguageSelect } from '@/components/ai-code-converter/LanguageSelect';
import { TextBlock } from '@/components/ai-code-converter/TextBlock';
import AppLayout from '@/layouts/app-layout';
import { OpenAIModel, TranslateBody } from '@/utils/types';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ModelContext from '@/hooks/model-context';

export default function CodeGeneration() {
  const [inputCode, setInputCode] = useState<string>(
    'def function_name(param):\n\t\'\'\'\n\tCode description\n\t\'\'\'\n\treturn'
  );
  const [outputCode, setOutputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const { model } = useContext<any>(ModelContext);

  const handleTranslate = async () => {
    const maxCodeLength = 6000;

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

    console.log("BODY", {
      task: model.task,
      model: model.model,
      input_type: model.input_type,
      output_type: model.output_type,
      text: inputCode
    })
    const res = (await axios.post('http://localhost:5000/process_single_request', {
      task: model.task,
      model: model.model,
      input_type: model.input_type,
      output_type: model.output_type,
      text: inputCode
    })) as any;
    console.log("RES", res)
    if (res.status !== 200) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = res.data;
    console.log("DATA", data)
    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }
    setOutputCode(data.result);
    

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(data.result);
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
  }, []);

  return (
    <AppLayout>
      <div className='flex h-full min-h-screen flex-col items-center bg-[#080E0B] px-4 pb-20 text-neutral-200 sm:px-10'>
        <div className='mt-5 flex flex-col items-center justify-center sm:mt-10'>
          {/* <div className='text-4xl font-bold'>AI Code Converter</div> */}
        </div>

        <div className='mt-5 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4'>
          <div className='h-100 flex flex-col justify-center space-y-2 sm:w-2/4'>
            <div className='text-center text-xl font-bold'>Input</div>
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
          </div>
          <div className='mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4'>
            <div className='text-center text-xl font-bold'>Output</div>
              <CodeBlock code={outputCode} />
          </div>
        </div>
        <div className='mt-5 flex items-center space-x-2'>
          <button
            className='text-color-black w-[220px] cursor-pointer rounded-md bg-primary/90 px-4 py-4 font-bold text-black hover:bg-primary/100 active:bg-primary/100'
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
