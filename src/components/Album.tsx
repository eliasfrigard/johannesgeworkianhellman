import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import AnimateIn from './AnimateIn'

const Album = ({ 
  title, 
  text, 
  cover, 
  spotify,
  flipped = false
} : {
  title: string
  text?:any
  cover: string
  spotify: string
  flipped?: boolean
}) => {
  return (
    <AnimateIn className='w-full flex flex-col centerContent'>
      <div className={`container grid grid-flow-row mx-12 gap-6 lg:gap-6 ${spotify && 'lg:grid-cols-2'}`}>
        <div className={`${flipped && 'lg:order-2'} overflow-hidden rounded-xl shadow-lg w-full md:h-full aspect-square relative`}>
          <Image
            alt={title}
            src={cover}
            fill
            className='object-cover rounded-xl aspect-square overflow-hidden'
          />
          {text && text.length > 0 && (
            <div className='imageOverlay p-10 md:p-16 overflow-y-scroll scrollbarHide'>
              <div className='prose tracking-wide leading-loose prose-img:rounded-xl prose-invert'>
                {documentToReactComponents(text)}
              </div>
            </div>
          )}
        </div>
        {spotify && (
          <iframe
            className={`${flipped && 'order-1'} md:shadow-lg min-h-300px h-[450px] md:h-full md:aspect-square w-full`}
            src={`https://open.spotify.com/embed/album/${spotify.split('/').pop()}`}
            allowFullScreen
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
        )}
      </div>
    </AnimateIn>
  )
}

export default Album
