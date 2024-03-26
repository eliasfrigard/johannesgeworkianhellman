import React from 'react'

import { BsFacebook, BsGlobeEuropeAfrica, BsInstagram, BsYoutube, BsSpotify, BsMailbox, BsPinMapFill, BsTicketPerforated } from 'react-icons/bs'

const IconHandler = ({
  email,
  facebook,
  instagram,
  spotify,
  youTube,
  website,
  tickets,
  address,
  className,
  websiteName,
} : {
  email?: string
  facebook?: string
  instagram?: string
  spotify?: string
  youTube?: string
  website?: string
  tickets?: string
  address?: {
    lat: number
    lon: number
  }
  className?: string
  websiteName?: string

}) => {
  const [mailLink, setMailLink] = React.useState('')
  const [addressLink, setAddressLink] = React.useState('')
  const [noIcons, setNoIcons] = React.useState(false)

  React.useEffect(() => {
    if (!address) {
      setAddressLink('')
    } else {
      setAddressLink(`https://www.google.com/maps?q=${address.lat},${address.lon}`)
    }
  }, [address])

  React.useEffect(() => {
    if (!email) {
      setMailLink('')
    } else {
      setMailLink(`mailto:${email}?subject=${websiteName} Website`)
    }
  }, [email, websiteName])

  React.useEffect(() => {
    setNoIcons(prev => (
      !email
      && !facebook
      && !instagram
      && !spotify
      && !youTube
      && !website
      && !tickets
      && !address
      && !websiteName
    ));
  }, [email, facebook, instagram, spotify, youTube, website, tickets, address, websiteName])

  const LinkIcon = ({ 
    children,
    href,
    tooltip 
  } : {
    children: React.ReactNode
    href: string
    tooltip: string
  }) => {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='duration-200'
      >
        {children}
      </a>
    )
  }

  if (noIcons) return ''

  return (
    <div className={`flex text-2xl justify-center items-center gap-5 z-10 ${className}`}>
      {
        address && (
          <LinkIcon href={addressLink} tooltip='Google Maps'>
            <BsPinMapFill className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        email && (
          <LinkIcon href={mailLink} tooltip='Email'>
            <BsMailbox className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        website && (
          <LinkIcon href={website} tooltip='Website'>
            <BsGlobeEuropeAfrica className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        tickets && (
          <LinkIcon href={tickets} tooltip='Tickets'>
            <BsTicketPerforated className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        facebook && (
          <LinkIcon href={facebook} tooltip='Facebook'>
            <BsFacebook className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        instagram && (
          <LinkIcon href={instagram} tooltip='Instagram'>
            <BsInstagram className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        spotify && (
          <LinkIcon href={spotify} tooltip='Spotify'>
            <BsSpotify className='soMeIcon' />
          </LinkIcon>
        )
      }
      {
        youTube && (
          <LinkIcon href={youTube} tooltip='YouTube'>
            <BsYoutube className='soMeIcon' />
          </LinkIcon>
        )
      }
    </div>
  )
}

export default IconHandler
