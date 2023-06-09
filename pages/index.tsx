import { MouseEventHandler, useState } from 'react';
import Head from 'next/head'
import { LazyImage } from '@/components/RandomFox';
import {random} from "lodash";
const myRandom =() => random(1, 123);

const generateId = () => Math.random().toString(36).substring(2,9);

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);

  const addNewFox:MouseEventHandler<HTMLButtonElement>= (event)  => {
    event.preventDefault();
    const newImageItem:IFoxImageItem = { 
      id: generateId(),
      url:`https://randomfox.ca/images/${myRandom()}.jpg`
    };

    setImages([
      ...images,
      newImageItem
    ]);
  };

  return (
    <>
      <Head>
        <title>Platzi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Hello worlds</h1>
        <button onClick={addNewFox}>Add New FOX</button>
        {images.map(({id, url}) => (
          <div key={id} className="p-4">
            <LazyImage 
              src={url} 
              onClick={()=>console.log('hey')}
              width={320}
              height="auto"
              />
          </div>
        ))}
      </main>
    </>
  )
}
