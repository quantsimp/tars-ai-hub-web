import React, { useState } from 'react';
import { synthesizeText } from '../api/textToSpeech';
import AppLayout from '@/layouts/app-layout';

const TextToSpeechPage = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      const blob = await synthesizeText(inputText);
      const url = URL.createObjectURL(blob);

      const audio = new Audio();
      audio.src = url;
      audio.play();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadClick = async () => {
    try {
      const blob = await synthesizeText(inputText);
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'ai-text-to-speech.mp3';
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
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
              Voice it!
            </button>
            <button
              className='relative flex items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-black transition-colors hover:bg-opacity-80'
              onClick={handleDownloadClick}
            >
              Text to Speech Download
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TextToSpeechPage;
