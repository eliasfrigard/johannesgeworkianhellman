import { 
  SlHome,
  SlSocialSpotify,
  SlSocialFacebook,
  SlSocialYoutube
} from "react-icons/sl"

const BandIcons = ({
  bandName,
  website,
  spotify,
  facebook,
  youTube
} : {
  bandName: string
  website?: string
  spotify?: string
  facebook?: string
  youTube?: string
}) => {
  if (!website && !spotify && !facebook && !youTube) return null

  const divClasses = 'hover-effect-container flex flex-col items-center gap-3 justify-center duration-150 rounded-full cursor-pointer px-3'

  const underlines = () => {
    return (
      <div className="w-full flex flex-col items-center gap-1">
        <div className="firstLine w-full h-[1px] bg-primary-500 rounded-full bg-opacity-50 duration-150"/>
        <div className="secondLine w-5/6 h-[1px] bg-primary-500 rounded-full bg-opacity-30 duration-150"/>
      </div>
    )
  }

  const icon = (IconComponent: any, type: string) => {
    return (
      <div className={divClasses}>
        <div className="iconContainer rounded-full p-3 -mb-2">
          <IconComponent className="icon duration-150 " />
        </div>

        <p className="text-base font-medium tracking-wide text-center">{`${bandName} ${type}`}</p>

        {underlines()}
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:flex justify-center items-center w-full gap-8 text-2xl -my-3">
        {website && icon(SlHome, 'Website')}
        {spotify && icon(SlSocialSpotify, 'Spotify')}
        {facebook && icon(SlSocialFacebook, 'Facebook')}
        {youTube && icon(SlSocialYoutube, 'YouTube')}
      </div>
      <div className="flex md:hidden justify-center items-center w-full gap-6 text-2xl">
        <SlHome className="icon duration-150" />
        <SlSocialSpotify className="icon duration-150" />
        <SlSocialFacebook className="icon duration-150" />
        <SlSocialYoutube className="icon duration-150" />
      </div>
    </>
  )
}

export default BandIcons
