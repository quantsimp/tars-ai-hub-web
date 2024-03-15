import React, { useState } from 'react';
import { synthesizeText } from '../api/textToSpeech';
import AppLayout from '@/layouts/app-layout';
import axios from 'axios';
import ModelContext from '@/hooks/model-context';
import clsxm from '@/utils/clsxm';

const TextToSpeechPage = () => {
  const [inputText, setInputText] = useState('');
  const { model } = React.useContext<any>(ModelContext);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: validating message length
    setInputText(event.target.value);
    const input = event.target.value;
    const words = input.trim().split(' ');

    if (words.length <= 2000) {
      setInputText(input);
    }
  };
  const wordCount = inputText.trim().split(' ').filter(Boolean).length;

  const handleSynthesizeClick = async () => {
    try {
      setLoading(true);
      setError('');
      setAudioUrl('');
      const res = (await axios.post('http://localhost:5000/process_single_request', {
        task: model.task,
        model: model.model,
        input_type: model.input_type,
        output_type: model.output_type,
        text: inputText
      }, { responseType: 'blob' })) as any;
      if(res && res.status === 200){
        const url = URL.createObjectURL(res.data);
        setAudioUrl(url);
        setError('');
      }else{
        setError('Cannot generate audio, please try again')
      }
    } catch (error) {
      console.error(error);
      setError('Cannot generate audio, please try again')
    }
    setLoading(false);
  };

  const handleDownloadClick = async () => {
    try {
      setLoading(true);
      setError('');
      setAudioUrl('');
      const res = (await axios.post('http://localhost:5000/process_single_request', {
        task: model.task,
        model: model.model,
        input_type: model.input_type,
        output_type: model.output_type,
        text: inputText
      }, { responseType: 'blob' })) as any;
      if(res && res.status === 200){
        const url = URL.createObjectURL(res.data);
        setAudioUrl(url);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'ai-text-to-speech.mp3';
        downloadLink.click();
        setError('');
        
      }else{
        setError('Cannot generate audio, please try again')
      }
    } catch (error) {
      console.error(error);
      setError('Cannot generate audio, please try again')
    }
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className=' min-h-screen  bg-[#080E0B] font-sans text-white '>
        <div className='container mt-10 w-full items-center justify-center'>
          <h1 className='mb-5 text-2xl font-medium'>Text to Speech AI</h1>

          <textarea
            className='h-[350px] w-full resize-y rounded-md border border-primary/20 bg-[#232323] tracking-wider focus:outline-none focus:ring-primary'
            value={inputText}
            onChange={handleInputChange}
          />

          <p className='absolute mt-2 hidden text-white md:block'>Word Count: {wordCount}</p>
          <div className='flex justify-end space-x-2'>
            <button
              className='flexitems-center relative h-12 justify-center rounded-md bg-primary px-5 text-sm font-semibold text-black transition-colors hover:bg-opacity-80'
              onClick={handleSynthesizeClick}
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
                Voice it!
              </span>
              
            </button>
            <button
              className='relative flex items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-black transition-colors hover:bg-opacity-80'
              onClick={handleDownloadClick}
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
                Text to Speech Download
              </span>
              
            </button>
          </div>
          <div className="audio-element">
            <div className="relative flex items-center justify-center">
              {audioUrl && (
                <audio controls >
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            {error.length > 0 && (
              <div className='flex space-x-3 text-red-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TextToSpeechPage;
