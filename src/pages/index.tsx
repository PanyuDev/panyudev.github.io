import Image from 'next/image'
import { Inter } from 'next/font/google'
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useRef } from 'react';

import { FaYoutube, FaDiscord, FaTwitter, FaTwitch  } from "react-icons/fa";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const sequenceRef = useRef('');

  const rot13Decode = (str: string): string => {
    return str.replace(/[A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : code >= 97 && code <= 122 ? 97 : 0;
      return base ? String.fromCharCode(((code - base + 13) % 26) + base) : char;
    });
  };

  const fetchAndDownloadWoof = async () => {
    try {
      const response = await fetch('/api/woof');
      const data = await response.json();
      const woofContent = data.content;

      // First ROT13 decode, then base64 decode
      const base64Content = rot13Decode(woofContent);
      const byteCharacters = atob(base64Content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'WoofWoof.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading woof file:', error);
    }
  };  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      sequenceRef.current += e.key.toLowerCase();
      console.log('Sequence:', sequenceRef.current);
      if (sequenceRef.current.includes('wanwan')) {
        console.log('Wanwan detected, downloading woof file...');
        fetchAndDownloadWoof();
        sequenceRef.current = '';
      }
      if (sequenceRef.current.length > 10) {
        sequenceRef.current = sequenceRef.current.slice(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <div className='frostedBox h-auto w-auto mx-auto my-auto items-center rounded-lg drop-shadow-2xl py-2 px-4 flex space-x-12'>
      <div className='flex flex-row'>
        <img src="profile.jpeg" className='h-28 w-auto m-1 rounded-full'/>
        <div className='text'>
          <h1 className='text-white text-xl ml-4'>Hi I&#39;m 
            <TypeAnimation
              sequence={[
                1000,
                " Panyu!"
              ]}
              wrapper="span"
              cursor={true}
            /> 
          </h1>
        <h3 className=' text-slate-300 ml-4' > Front-end Developer & <br/>Aspiring Content Creator</h3>
        </div>
      </div>
      <div className='iconDrawer text-white text-2xl'>
        <a href="https://twitter.com/PanyuTweets" className='icons order-1' target='_blank'> <FaTwitter /> </a>
        <a href="https://youtube.com/@PanyuYT" className='icons order-2' target='_blank'> <FaYoutube /> </a>
        <a href="https://twitch.tv/PanyuStreams" className='icons order-3' target='_blank'> <FaTwitch /> </a>
        <a href="https://discord.gg/FUpeCRCva4" className='icons order-4' target='_blank'> <FaDiscord /> </a>
      </div>
      </div>
    </main>
  )
}



