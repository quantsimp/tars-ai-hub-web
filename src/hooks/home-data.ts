import { useState } from 'react';
import axios from 'axios';

export function useHomeData() {
  // hacky solution to wait for data from api to arrive
  // TODO: solve this before production deployment
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  sleep(500);
  const [keyword, setKeyword] = useState<string>('');

  const tools = items.filter((o) => o.title?.toLowerCase().includes(keyword?.toLowerCase()));
  
  return { tools, keyword, setKeyword };
}

export type Model = {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  model: string;
  task: string;
  input_type: string;
  output_type: string;
  created_at: Date;
}

export type Tool = {
  imageSrc: string;
  title: string;
  approved: boolean;
  description: string;
  launch: {
    url: string;
    text: string;
    variant: string;
  };
  detail: {
    url: string;
    text: string;
    variant: string;
  };
  ribbon?: string;
  disabled?: boolean;
  showStaking?: boolean;
  showTag?: string;
  model?: string;
  task?: string;
  input_type?: string;
  output_type?: string;
  created_at?: Date;
};

// get models from API
// this is a bit delayed, so sometimes the page may load without any models
var items: Tool[] = [];
axios.get('http://localhost:5000/models')
  .then(res => {
    const models = res.data.result;
    console.log("MODELS", models);
    items = models.map((model: Model) => {
      return {
        imageSrc: model.imageSrc,
        title: model.title,
        approved: true,
        description: model.description,
        launch: {
          url: '/app/chatgpt',
          text: 'Launch',
          variant: 'primary'
        },
        detail: {
          url: '',
          text: 'Detail',
          variant: 'white'
        },
        ribbon: `${model.price}`
      }
    });
  });
// const items: Tool[] = [
//   {
//     imageSrc: '/images/chatgpt/cover1.png',
//     title: 'GPT-4',
//     approved: true,
//     description:
//       'GPT-4 can generate, edit, and iterate with users on creative and technical writing tasks, such as composing songs, writing screenplays, or learning a user’s writing style.',
//     launch: {
//       url: '/app/chatgpt',
//       text: 'Launch',
//       variant: 'primary',
//     },
//     detail: {
//       url: '/detail/chatgpt',
//       text: 'Detail',
//       variant: 'white',
//     },
//     ribbon: '$20/mo',
//   },
//   {
//     imageSrc: '/images/tools/Text-To-Image.jpg',
//     title: 'Text-to-Image',
//     approved: true,
//     description: `A latent text-to-image diffusion model capable of generating photo-realistic images given any text input.`,
//     launch: {
//       url: '/app/dalle2',
//       text: 'Launch',
//       variant: 'primary',
//     },
//     detail: {
//       url: '/detail/dalle2',
//       text: 'Detail',
//       variant: 'white',
//     },
//     ribbon: '$20/mo',
//   },
//   {
//     imageSrc: '/images/tools/Text-To-Audio.png',
//     title: 'Text-to-Audio',
//     approved: false,
//     description:
//       'AudioLDM generates text-conditional sound effects, human speech, and music. It enables zero-shot text-guided audio style-transfer, inpainting, and super-resolution.',
//     launch: {
//       url: '/app/text-to-audio',
//       text: 'Launch',
//       variant: 'primary',
//     },
//     detail: {
//       url: '/detail/text-to-audio',
//       text: 'Detail',
//       variant: 'white',
//     },
//     ribbon: '$24/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Code-Converter.png',
//     title: 'Code-Converter',
//     approved: false,
//     description:
//       'Seamlessly convert code between popular programming languages, such as Python, Java, Kotlin, Swift, Dart, and more, with just a few clicks.',
//     launch: {
//       url: '/app/ai-code-converter',
//       text: 'Launch',
//       variant: 'primary',
//     },
//     detail: {
//       url: '/detail/ai-code-converter',
//       text: 'Detail',
//       variant: 'white',
//     },
//     ribbon: '$17/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Video-To-Anime.gif',
//     title: 'Video-to-Anime',
//     approved: false,
//     description: 'Mainly based on StyleGAN2 by rosalinity and partly from UGATIT.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$34.33/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Video-Object-Replacement.gif',
//     title: 'Video-Object-Replacement ',
//     approved: false,
//     description: 'One-Shot Tuning of Image Diffusion Models for Text-to-Video Generation.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Video-Colorization.gif',
//     title: 'Video-Colorization',
//     approved: false,
//     description:
//       'Colorization using a Generative Color Prior for Natural Images, an implementation of the ECCV 2022 Paper.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$30/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Make-Any-Image-Talk.gif',
//     title: 'Make-Any-Image-Talk',
//     approved: false,
//     description:
//       'Based on the framework of pix2pix-pytorch and MakeItTalk, ATVG, RhythmicHead, Speech-Driven Animation.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$25/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Image-To-Text.png',
//     title: 'Image-to-Text',
//     approved: false,
//     description: `The CLIP Interrogator is a prompt engineering tool that combines OpenAI's CLIP and Salesforce's BLIP to optimize text prompts to match a given image. Use the resulting prompts with text-to-image models like Stable Diffusion to create cool art!`,
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/AI-Logo-Designer.png',
//     title: 'AI-Logo-Designer',
//     approved: false,
//     description: `Erlich is the text2image latent diffusion model from CompVis (with additions from glid-3-xl) finetuned on a dataset collected from LAION-5B named Large Logo Dataset. It consists of roughly 1000K images of logos with captions generated via BLIP using aggressive re-ranking.`,
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Image-Style-Transfer.png',
//     title: 'Image-Style-Transfer',
//     approved: false,
//     description: `CLIPstyler: Image Style Transfer with a Single Text Condition.`,
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$30/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Image-Segment.png',
//     title: 'Image-Segment',
//     approved: false,
//     description: 'Image segmentation base on Segment Anything Model (SAM).',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Image-Restoration.png',
//     title: 'Image-Restoration',
//     approved: false,
//     description: 'Blind Face Restoration with Vector-Quantized Dictionary and Parallel Decoder.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$30/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Object-Removal.png',
//     title: 'Object-Removal',
//     approved: false,
//     description:
//       'Combines Semantic segmentation and EdgeConnect architectures with minor changes in order to remove specified objects from photos.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$12/mo',
//     showStaking: false,
//   },

//   {
//     imageSrc: '/images/tools/Speech-To-Text.png',
//     title: 'Speech-to-Text',
//     approved: false,
//     description:
//       'A general-purpose speech transcription model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech transcription as well as speech translation and language identification.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$59/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Text-To-Video.png',
//     title: 'Text-to-Video',
//     approved: false,
//     description:
//       'Based on a multi-stage text-to-video generation diffusion model, which inputs a description text and returns a video that matches the text description.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$49/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Image-Super-Resolution.png',
//     title: 'Image-Super-Resolution',
//     approved: false,
//     description: 'Image super-resolution with Stable Diffusion 2.0.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$25/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Text-To-Music.png',
//     title: 'Text-to-Music',
//     approved: false,
//     description:
//       'Fine-tuned on images of spectrograms paired with text base on stable diffusion 2.0. Audio processing happens downstream of the model.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$99/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Text-Recognition.png',
//     title: 'Text-Recognition',
//     approved: false,
//     description: 'Based on PaddleOCR ch_ppocr_server_v2.0_xx model.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Generate-Detailed-Images-From-Scribbled-Drawings.png',
//     title: 'Generate-Detailed-Images-from-Scribbled-Drawings',
//     approved: false,
//     description:
//       'This model is ControlNet adapting Stable Diffusion 2.0 to use a line drawing (or "scribble") in addition to a text input to generate an output image.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$39/mo',
//     showStaking: false,
//   },

//   {
//     imageSrc: '/images/tools/AI-Face-Swap.png',
//     title: 'AI-Face-Swap',
//     approved: false,
//     description: 'Based on GHOST (Generative High-fidelity One Shot Transfer).',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29/mo',
//     showStaking: false,
//   },

//   {
//     imageSrc: '/images/tools/Voice-Changing.png',
//     title: 'Voice-Changing',
//     approved: false,
//     description:
//       'This model adopts the end-to-end framework of VITS for high-quality waveform reconstruction, and propose strategies for clean content information extraction without text annotation.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$99/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/AI-Clothes-Changer.png',
//     title: 'AI-Clothes-Changer',
//     approved: false,
//     description: 'Fine-tuned Stable Diffusion model trained on clothes changing.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$24.99/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/AI-Interior-Design.png',
//     title: 'AI-Interior-Design',
//     approved: false,
//     description: 'Generate interior design based on stable diffussion.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$29.99/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Age-Prediction.png',
//     title: 'Age-Prediction',
//     approved: false,
//     description: 'Computes the similarity age with an input image, using CLIP.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$150/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/tools/Style-Your-Hair.png',
//     title: 'Style-Your-Hair',
//     approved: false,
//     description:
//       'Latent Optimization for Pose-Invariant Hairstyle Transfer via Local-Style-Aware Hair Alignment based on Barbershop.',
//     launch: {
//       url: '/',
//       text: 'Soon!',
//       variant: 'disabled',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     ribbon: '$39/mo',
//     showStaking: false,
//   },
//   {
//     imageSrc: '/images/soon_cover.png',
//     title: 'New AI Model Coming Soon',
//     approved: true,
//     description:
//       'Guess our new AI Integration and claim the rewards! Click the "Guess & Earn" button for details!',
//     launch: {
//       url: '',
//       text: 'Guess & Earn!',
//       variant: 'yellow',
//     },
//     detail: {
//       url: '',
//       text: 'Detail',
//       variant: 'disabled',
//     },
//     showStaking: false,
//   },
// ];
