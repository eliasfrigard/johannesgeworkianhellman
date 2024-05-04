import Image from "next/image"
import Layout from "@/layouts/default"
import { createClient } from 'contentful'
import Concert from "@/components/Concert"
import { getPlaiceholder } from 'plaiceholder'

import {
  Hero,
  AnimateIn,
  getImageBuffer
} from 'eliasfrigard-reusable-components/dist/app'

const getImageBlur = async (url: string) => {
  if (!url) return null
  
  const buffer = await getImageBuffer('https:' + url)
  const { base64 } = await getPlaiceholder(buffer)
  return base64
}

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
  })

  const currentDate = new Date().toISOString()

const upcomingConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    order: ['fields.dateTime'],
    'fields.dateTime[gte]': currentDate,
})

  const previousConcertsRes = await contentful.getEntries({
    content_type: 'concert',
    order: ['-fields.dateTime'],
    'fields.dateTime[lte]': currentDate,
  })

  const pageRes = await contentful.getEntries({
    content_type: 'concertPage',
  })

  const page = pageRes.items[0].fields

  const hero: any = page?.hero
  const mobileHero: any = page?.mobileHero

  const heroUrl = hero ? hero?.fields?.file?.url : null
  const mobileHeroUrl = mobileHero ? mobileHero?.fields?.file?.url : null

  const heroBlur = await getImageBlur(heroUrl)
  const mobileHeroBlur = await getImageBlur(mobileHeroUrl)

  const heroProps = {
    altText: hero?.fields?.title,
    blur: heroBlur,
    url: 'https:' + heroUrl
  }

  const mobileHeroProps = {
    altText: mobileHero?.fields?.title,
    blur: mobileHeroBlur,
    url: 'https:' + mobileHeroUrl
  }

  return {
    props: {
      ...(hero ? { hero: heroProps } : { hero: null }),
      ...(mobileHero ? { mobileHero: mobileHeroProps } : { mobileHero: null }),
      concerts: {
        upcoming: upcomingConcertsRes?.items || [],
        previous: previousConcertsRes?.items || [],
      }
    },
  }
}

const Calendar = ({
  hero,
  mobileHero,
  concerts,
} : {
  hero: { altText: string, url: string },
  mobileHero: { altText: string, url: string },
  concerts: {
    upcoming: any[]
    previous: any[]
  }
}) => {
  return (
    <Layout transparent={true} pageTitle="Concerts">
      {
        hero && mobileHero && (
          <Hero
            spaced={false}
            Image={Image}
            desktopImg={hero}
            mobileImg={mobileHero}
            overlay={false}
            imagePosition='top'
          />
        )
      }

      <div className={`flex flex-col my-8 ${hero && mobileHero ? 'lg:my-16' : ''} gap-8 lg:gap-16`}>
        {concerts.upcoming.length > 0 && (
          <AnimateIn className="px-3 container mx-auto flex flex-col justify-center items-center gap-8 lg:gap-12">
            <h2 className="text-center text-4xl lg:text-5xl mx-8 font-bold uppercase tracking-wider border-b-2 border-accent-500 border-opacity-80 pb-6 lg:pb-8">Upcoming Shows</h2>
            <div className="w-full flex flex-col justify-center items-center gap-3 lg:gap-6">
              {concerts.upcoming.map((concert) => (
                <Concert 
                key={concert.sys.id}
                date={concert.fields.dateTime}
                description={concert.fields.title}
                location={concert.fields.cityCountry}
                facebook={concert.fields.facebook}
                website={concert.fields.website}
                tickets={concert.fields.tickets}
                address={concert.fields.address}
                />
                ))}
            </div>
          </AnimateIn>
        )}
        {concerts.previous.length > 0 && (
          <AnimateIn className="px-3 container mb-4 mx-auto flex flex-col justify-center items-center gap-8 lg:gap-12">
            <h2 className="text-center text-4xl lg:text-5xl mx-8 font-bold uppercase tracking-wider border-b-2 border-accent-500 border-opacity-80 pb-6 lg:pb-8">Past Shows</h2>
            <div className="w-full flex flex-col justify-center items-center gap-3 lg:gap-6">
              {concerts.previous.map((concert) => (
                <Concert 
                  key={concert.sys.id}
                  date={concert.fields.dateTime}
                  description={concert.fields.title}
                  location={concert.fields.cityCountry}
                  facebook={concert.fields.facebook}
                  website={concert.fields.website}
                  tickets={concert.fields.tickets}
                  address={concert.fields.address}
                />
              ))}
            </div>
          </AnimateIn>
        )}
      </div>
    </Layout>
  )
}

export default Calendar
