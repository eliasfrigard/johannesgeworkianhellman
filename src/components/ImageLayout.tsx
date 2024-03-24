import Image from 'next/image'
import AnimateIn from './AnimateIn'

const ImageLayout = ({ 
  image, 
  index, 
  handleOnClick
} : {
  image: {
    url: string
    blur?: string
  }
  index: number
  handleOnClick?: () => void
}) => {
  return (
    <a href={image.url}>
      <AnimateIn delay={index * 150} threshold={0} className={`relative h-full w-full max-h-[700px] aspect-square delay-[${index * 1000}}ms]`} >
        <Image
          alt={image.url}
          src={image.url + '?w=1000&h=1000'}
          fill
          className={`object-cover object-center rounded-sm shadow`}
          placeholder={image?.blur ? 'blur' : 'empty'}
          blurDataURL={image?.blur}
        />

        {/* IMAGE OVERLAY */}
        <div className='absolute cursor-pointer bg-secondary-500 w-full h-full z-10 opacity-20 hover:opacity-0 duration-300 grayscale'></div>
      </AnimateIn >
    </a>
  )
}

export default ImageLayout
