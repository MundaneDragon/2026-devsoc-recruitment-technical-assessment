"use client";
import { useState } from 'react';
import Image from 'next/image';
export default function ClickableImageDiv({ initialImage, nextImage }: {initialImage: string, nextImage: string}) {
  
  // 2. Set the starting state to whatever 'initialImage' was passed in
  const [currentImage, setCurrentImage] = useState(initialImage);

  return (
    <div className="flex items-center cursor-pointer" onClick={() => setCurrentImage(currentImage === initialImage ? nextImage : initialImage)}>
        <Image 
            src={currentImage} 
            alt="Freerooms Logo" 
            className=""
            width={40}
            height={40}
        />
        <h1 className="hidden sm:inline text-4xl font-bold text-orange-500 tracking-[1px]">Freerooms</h1>
    </div>
  );
}