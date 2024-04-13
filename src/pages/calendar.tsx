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
    content_type: 'biographyPage',
  })

  const page = pageRes.items[0].fields

  const hero: any = page?.hero
  const mobileHero: any = page?.mobileHero

  const heroUrl = 'https:' + hero?.fields.file.url
  const mobileHeroUrl = mobileHero ? 'https:' + mobileHero?.fields?.file?.url : heroUrl

  const heroBuffer = await getImageBuffer(heroUrl)
  const mobileHeroBuffer = await getImageBuffer(mobileHeroUrl)

  const { base64: heroBlur } = await getPlaiceholder(heroBuffer)
  const { base64: mobileHeroBlur } = await getPlaiceholder(mobileHeroBuffer)

  return {
    props: {
      hero: {
        altText: hero?.fields?.title,
        blur: heroBlur,
        url: heroUrl
      },
      mobileHero: {
        altText: mobileHero ? mobileHero?.fields?.title : hero?.fields?.title,
        blur: mobileHeroBlur,
        url: mobileHeroUrl
      },
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
      <Hero
        spaced={false}
        Image={Image}
        desktopImg={hero}
        mobileImg={mobileHero}
        overlay={false}
        imagePosition='top'
      />

      {concerts.upcoming.length > 0 && (
        <AnimateIn className="px-3 container my-8 lg:my-16 mx-auto flex flex-col justify-center items-center gap-8 lg:gap-12">
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
        <AnimateIn className="px-3 container mb-4 lg:mt-16 mx-auto flex flex-col justify-center items-center gap-8 lg:gap-12">
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
    </Layout>
  )
}

export default Calendar
