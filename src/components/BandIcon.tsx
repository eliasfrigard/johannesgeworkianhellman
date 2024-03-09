import { 
  SlHome,
  SlSocialSpotify,
  SlSocialFacebook,
  SlSocialYoutube
} from "react-icons/sl"

const BandIcons = ({
  website,
  spotify,
  facebook,
  youTube
} : {
  website?: string
  spotify?: string
  facebook?: string
  youTube?: string
}) => {
  if (!website && !spotify && !facebook && !youTube) return null

  const divClasses = 'flex flex-col items-center gap-2 justify-center hover:bg-primary-600 hover:text-white duration-150 rounded-full cursor-pointer'

  return (
    <div className="flex justify-center items-center w-full gap-8 text-4xl">
      {website && (
        <div className={divClasses}>
          <SlHome />
          <p className="text-base font-medium">Garizim Website</p>
          <div className="w-full h-[1px] bg-red-500"/>
          <div className="w-full h-[1px] bg-red-500"/>
        </div>
      )}
      {spotify && (
        <div className={divClasses}>
          <SlSocialSpotify />
        </div>
      )}
      {facebook && (
        <div className={divClasses}>
          <SlSocialFacebook />
        </div>
      )}
      {youTube && (
        <div className={divClasses}>
          <SlSocialYoutube />
        </div>
      )}
    </div>
  )
}

export default BandIcons
