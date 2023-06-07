import Link from 'next/link';
import IconDiscord from '~/icons/icon-discord.svg';

import IconGithub from '~/icons/icon-github.svg';
import IconMail from '~/icons/icon-mail.svg';
import IconTelegram from '~/icons/icon-telegram.svg';
import IconTwitter from '~/icons/icon-twitter.svg';
export default function Footer() {
  const footerLinks = [
    {
      title: 'About',
      links: [
        {
          name: 'Docs',
          url: 'https://docs.tars.pro',
        },
        {
          name: 'Litepaper',
          url: 'https://docs.tars.pro/tars-ai-hub',
        },
        {
          name: 'Blog',
          url: 'https://blog.tars.pro/',
        },
        {
          name: 'Authenticity Check',
          url: 'https://tars.pro/space/TARS',
        },
        {
          name: 'Brand Kit',
          url: 'https://tars.pro/brand-kit',
        },
      ],
    },
    {
      title: 'Explore',
      links: [
        {
          name: 'TARS Spaces',
          url: 'https://tars.pro/spaces',
        },
        {
          name: 'AI Hub',
          url: 'https://ai.tars.pro',
        },
        {
          name: 'TARS SDK',
          url: '',
          tag: 'Soon',
        },
        {
          name: 'TARS API',
          url: '',
          tag: 'Soon',
        },
        {
          name: 'Builders Board',
          url: 'https://goto.tars.pro/builders',
        },
      ],
    },
    {
      title: 'Dashboard',
      links: [
        {
          name: 'My Access',
          url: 'https://ai.tars.pro/balance',
        },
        {
          name: 'My Space',
          url: '',
        },
        {
          name: 'My API',
          url: '',
        },
      ],
    },
  ];
  return (
    <footer
      className='sticky top-[100vh] border-t border-neutral-800 bg-cover'
      style={{
        backgroundImage: 'url(/images/footer-pattern.png)',
      }}
    >
      <div className='container h-84 py-12'>
        <div className='sticky top-[100vh]'>
          <footer className='site-container relative '>
            <div className='w-full   '></div>

            <div className=''>
              <div className='relative z-10 -my-6 mt-3 grid grid-cols-2 gap-4 xs:grid-cols-4 md:mt-6 md:grid-cols-7'>
                <div className='col-span-2 xs:col-span-4 md:col-span-3'>
                  <a href='https://tars.pro'>
                    <picture>
                      <source srcSet='/images/logo.png' type='image/webp' />
                      <img
                        src='/img/logo.png'
                        alt='TARS Protocol Logo'
                        width='310'
                        height='60'
                        className='h-[78px] w-auto min-w-0 object-contain object-left-top md:-mt-3'
                      />
                    </picture>
                  </a>
                  <p className='font-secondary mt-3 max-w-[460px] text-sm leading-relaxed text-neutral-300 md:max-w-[360px]'>
                    TARS AI Hub - Unleashing the Power of AI with Web3
                  </p>
                  <p className='font-secondary mt-2 max-w-[460px] text-sm leading-relaxed text-neutral-400 md:max-w-[360px]'>
                    Experience the leading AI Model aggregator powered by TARS Protocol. Access AI
                    models effortlessly by holding select crypto assets. Shape the future with us.
                  </p>
                  <div className='mt-6 w-4/5 '>
                    <a
                      href='https://goto.tars.pro/collab'
                      rel='noopener nofollow'
                      className='flex transform-gpu items-center rounded-xl border border-white/50 bg-black py-3 px-5 transition ease-in hover:-translate-y-1'
                    >
                      <img
                        loading='lazy'
                        src='/images/collab.png'
                        alt='email'
                        className='sm:w-1h-16 mr-5 h-12 w-12 min-w-0 shrink-0 object-contain object-center sm:h-16'
                      />
                      <div>
                        <div className='font-secondary text-lg text-white sm:text-xl'>
                          Collaborate with Us
                        </div>
                        <p className='font-secondary mt-1 text-sm leading-relaxed text-gray-400'>
                          Marketing, integration, token listing, and more.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {footerLinks.map((column) => (
                  <div className='my-6 md:my-0' key={column.title}>
                    <h5 className='font-secondary text-base font-semibold text-white'>
                      {column.title}
                    </h5>
                    <ul className='mt-3'>
                      {column.links.map((link) => (
                        <li className='py-1' key={link.name}>
                          <a
                            href={link.url}
                            className='relative text-sm text-neutral-400 hover:underline'
                          >
                            {link.name}
                            {link.tag && (
                              <span className='ml-2 rounded bg-[#55ff79] px-1 text-xs font-bold text-black'>
                                {link.tag}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className='my-6 md:my-0 md:w-auto'>
                  <h5 className='font-secondary text-base font-semibold text-white'>Contact</h5>
                  <ul className='mt-3'>
                    <li className='py-1'>
                      <a
                        href='https://twitter.com/AItarspro'
                        className='relative flex h-6 items-end text-sm text-neutral-400 hover:underline '
                      >
                        <div className='w-8'>
                          <IconTwitter className='h-5 w-5 text-white' />
                        </div>
                        Twitter
                      </a>
                    </li>
                    <li className='py-1'>
                      <a
                        href='https://t.me/tarspro'
                        className='flex h-6 items-end text-sm text-neutral-400 hover:underline '
                      >
                        <div className='w-8'>
                          <IconTelegram className='h-5 w-5 text-white' />
                        </div>
                        Telegram
                      </a>
                    </li>
                    <li className='py-1'>
                      <a
                        href='https://goto.tars.pro/discord'
                        className='flex h-6  items-end text-sm text-neutral-400 hover:underline'
                      >
                        <div className='w-8'>
                          <IconDiscord className='h-5 w-5 text-white' />
                        </div>
                        Discord
                      </a>
                    </li>
                    <li className='py-1'>
                      <a
                        href='https://github.com/Tars-protocol'
                        className='flex h-6  items-end text-sm text-neutral-400 hover:underline'
                      >
                        <div className='w-8'>
                          <IconGithub className='h-5 w-5 text-white' />
                        </div>
                        Github
                      </a>
                    </li>
                    <li className='py-1'>
                      <a
                        href='mailto:info@tars.pro'
                        className='flex h-6  items-end text-sm text-neutral-400 hover:underline'
                      >
                        <div className='w-8'>
                          <IconMail className='h-5 w-5 text-white' />
                        </div>
                        E-mail
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='relative z-10 mt-10 flex justify-between'>
              <span className='text-xs text-neutral-500 sm:text-sm'>
                © 2023 TARS AI Hub. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </footer>
  );
}
