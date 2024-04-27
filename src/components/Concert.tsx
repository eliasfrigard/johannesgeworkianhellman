import IconHandler from './IconHandler'
import AnimateIn from './AnimateIn'
import { BsPinMapFill } from "react-icons/bs"
import Moment from 'react-moment'

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
    <>
      <AnimateIn animationType='slide' className="w-full border-l-8 border-accent-500 lg:grid lg:grid-cols-[1fr_2fr_2fr_1fr] justify-between text-primary-300 text-center leading-relaxed bg-primary-700 bg-opacity-90 py-3 rounded shadow hidden">
        <div className="flex flex-col justify-center items-center px-6">
          <p className="text-3xl font-bold">
            <Moment format='DD'>
              {date}
            </Moment>
          </p>
          <p className="text-lg font-bold -mt-1">
            <Moment format='MMM'>
              {date}
            </Moment>
          </p>
          <p className="font-bold -mt-1">
            <Moment format='YYYY'>
              {date}
            </Moment>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center px-6">
          <p className="font-medium">{description}</p>
        </div>
        <div className="flex gap-3 justify-center items-center px-6">
          <BsPinMapFill className='text-lg text-accent-500' />
          <p className="font-bold">{location}</p>
        </div>
        <div className="flex flex-col justify-center items-center px-6">
          <IconHandler 
            facebook={facebook}
            website={website}
            tickets={tickets}
            address={address}
            className='text-accent-500'
            />
        </div>
      </AnimateIn>

      <AnimateIn animationType='slide' className="lg:hidden w-full border-l-8 border-accent-500 flex flex-col gap-4 justify-between text-primary-300 text-center leading-relaxed bg-primary-700 bg-opacity-90 rounded shadow px-6 py-3">
        <div className='flex justify-between items-center gap-3'>
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold">04</p>
            <p className="text-lg font-bold -mt-1">Sept</p>
            <p className="font-bold -mt-1">2024</p>
          </div>

          <div className='flex flex-col justify-between items-end gap-2 w-full h-full mt-2'>
            <IconHandler 
              facebook={facebook}
              website={website}
              tickets={tickets}
              address={address}
              className='text-accent-500'
            />
            <p className="font-bold">{location}</p>
          </div>
        </div>

        <div className='w-full h-[1px] bg-primary-300 rounded-full opacity-30'></div>

        <div className="flex flex-col justify-center items-center pb-1">
          <p className="font-medium">{description}</p>
        </div>
      </AnimateIn>
    </>
  )
}

export default Concert
