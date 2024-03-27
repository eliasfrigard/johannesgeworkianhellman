import Image from "next/image"
import TextLayout from "./TextLayout"
import BandIcons from "./BandIcons"

const Band = ({
  name,
  shortName,
  biography,
  image,
  website,
  spotify,
  facebook,
  youTube
 } : {
  name: string
  shortName?: string
  biography: any
  image: any
  website?: string
  spotify?: string
  facebook?: string
  youTube?: string
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 lg:gap-16">
      <h3 className="text-2xl md:text-5xl uppercase font-bold text-center leading-normal md:leading-tight">{name}</h3>
      <div className="w-full flex flex-col lg:flex-row gap-8">
        <div className="w-full">
          <div className='overflow-hidden aspect-video rounded w-full h-full relative'>
            <Image
              alt={image.fields.title}
              src={'https:' + image.fields.file.url}
              fill
              className='object-cover rounded overflow-hidden'
              />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          {biography && (
            <div className='flex justify-center items-center max-w-2xl'>
              <TextLayout text={biography} className='text-primary-600 text-center lg:text-left' type='presentation' />
            </div>
          )}
        </div>
      </div>

      <BandIcons
        bandName={shortName || name}
        website={website}
        spotify={spotify}
        facebook={facebook}
        youTube={youTube}
      />
    </div>
  )
}

export default Band
