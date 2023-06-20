import axios from 'axios';

export const synthesizeText = async (text: string): Promise<Blob> => {
  const apiUrl = 'https://api.salimcan.com/api/textToSpeech';

  const requestBody = {
    input: {
      text: text,
    },
    voice: {
      languageCode: 'en-US',
      ssmlGender: 'NEUTRAL',
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });

    if (response.status === 200) {
      const responseData = response.data;
      const audioContent = responseData.audioContent;

      if (audioContent) {
        const base64Data = audioContent.replace(/^data:audio\/mp3;base64,/, '');
        const blob = base64ToBlob(base64Data, 'audio/mp3');
        return blob;
      } else {
        throw new Error('Audio content could not be retrieved.');
      }
    } else {
      throw new Error('The Text-to-Speech API request failed.');
    }
  } catch (error) {
    throw new Error('The Text-to-Speech API request failed.');
  }
};

const base64ToBlob = (base64Data: string, contentType: string): Blob => {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
