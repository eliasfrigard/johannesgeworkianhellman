import IconHandler from './IconHandler'

const Concert = ({ 
  date,
  description,
  location,
  facebook,
  website,
  tickets,
  address,
 } : {
  date?: string
  description?: string
  location?: string
  email?: string
  facebook?: string
  website?: string
  tickets?: string
  address?: {
    lat: number
    lon: number
  }
 }) => {
  return (
    <div className="w-full flex lg:grid lg:grid-cols-[1fr_2fr_2fr_1fr] justify-between text-primary-300 text-center leading-relaxed bg-primary-600 bg-opacity-90 py-3 rounded">
      <div className="flex flex-col justify-center items-center px-6">
        <p className="text-3xl font-bold">04</p>
        <p className="text-lg font-bold -mt-1">Sept</p>
        <p className="font-bold -mt-1">2024</p>
      </div>
      <div className="flex flex-col justify-center items-center px-6">
        <p className="font-medium">{description}</p>
      </div>
      <div className="flex flex-col justify-center items-center px-6">
        <p className="font-bold">{location}</p>
      </div>
      <div className="flex flex-col justify-center items-center px-6">
        <IconHandler 
          facebook={facebook}
          website={website}
          tickets={tickets}
          address={address}
        />
      </div>
    </div>
  )
}

export default Concert
