import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import clsxm from '@/utils/clsxm';

import { templateYou, templateError, templateDale } from '@/utils/chat-templates';
import { apiAxios } from '@/api-axios';
import ModelContext from '@/hooks/model-context';
import axios from 'axios';

const Openai = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<string[]>([]);
  const [messageInput, setMessageInput] = React.useState<string>('');

  const { model } = React.useContext<any>(ModelContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const res = (await apiAxios.post('openai/image', {
      //   message: messageInput,
      // })) as any;
      const res = (await axios.post('http://localhost:5000/process_single_request', {
        task: model.task,
        model: model.model,
        input_type: model.input_type,
        output_type: model.output_type,
        text: messageInput
      }, { responseType: 'blob' })) as any;
      if (res) {
        const url = URL.createObjectURL(res.data) as string;
        setMessages([...messages, `${templateYou(messageInput)}`, `${templateDale([{url: url}])}`]);
      } else {
        setMessages([
          ...messages,
          `${templateYou(messageInput)}`,
          `${templateError(new Error('Something went wrong.'))}`,
        ]);
      }

      setLoading(false);
    } catch (error) {
      setMessages([
        ...messages,
        `${templateYou(messageInput)}`,
        `${templateError(error as Error)}`,
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } finally {
      setMessageInput('');
    }
  };

  return (
    <AppLayout>
      <div className='flex-1'>
        {messages.map((message, index) => (
          <div className='odd:bg-[#121212] even:bg-[#1C2B20]' key={index}>
            <div className='container'>
              <p
                className='py-4'
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              ></p>
            </div>
          </div>
        ))}
      </div>
      <form className='sticky bottom-0 bg-[#121212] pb-20 pt-6' onSubmit={handleFormSubmit}>
        <div className='container'>
          <div className='mx-60 flex space-x-6 '>
            <input
              type='text'
              className={clsxm(
                'h-12 w-full rounded-md border border-primary/20 bg-[#232323] focus:outline-none focus:ring-primary',
                {
                  'pointer-events-none border-neutral-800 bg-neutral-700': loading,
                }
              )}
              value={messageInput}
              onChange={handleInputChange}
              readOnly={loading}
            />
            <button
              type='submit'
              className='relative flex items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-black transition-colors hover:bg-opacity-80'
            >
              {loading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <img src='/images/loader-dots.svg' alt='' className='block h-6 w-6 shrink-0' />
                </div>
              )}
              <span
                className={clsxm({
                  'pointer-events-none opacity-0': loading,
                })}
              >
                Send
              </span>
            </button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
};

export default Openai;
