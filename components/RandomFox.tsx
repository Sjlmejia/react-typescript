import { useRef, useEffect, useState, ImgHTMLAttributes } from 'react';

//generate a random function 1 and 123
type LazyImageProps= {src: string};
type ImageNativesTypes= ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNativesTypes;

export const LazyImage = ({src, ...imgProps}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setScr] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );
  useEffect(() => {
      //nuevo observador
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log( "hey you")
        setScr(src)
      }
    });
  });

  //Observe node
  if(node.current) {
    observer.observe(node.current)
  }
  //desconectar
  return () => {
    observer.disconnect();
  }
  }, [src])
  
  return ( 
    <img ref={node}
      className="rounded bg-gray-300"
      src={currentSrc} 
      {...imgProps}
      />
  );
};
