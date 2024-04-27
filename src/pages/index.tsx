import Image from 'next/image'
import Layout from "@/layouts/default"
import type { ContentfulImage } from '../types'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'

import {
  Hero,
  getImageBuffer
} from 'eliasfrigard-reusable-components/dist/app'

import AnimateIn from '@/components/AnimateIn'
import Video from '@/components/Video'

import { BiSolidQuoteAltLeft } from "react-icons/bi";

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
  })

  const pageRes = await contentful.getEntries({
    content_type: 'homePage',
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

  const heroImage: ContentfulImage = {
    altText: hero?.fields?.title,
    blur: heroBlur,
    url: heroUrl,
  }

  const mobileHeroImage: ContentfulImage = {
    altText: mobileHero ? mobileHero?.fields?.title : hero?.fields?.title,
    blur: mobileHeroBlur,
    url: mobileHeroUrl,
  }

  const quotes: any[] = page?.quotes as any[]

  return {
    props: {
      hero: heroImage,
      mobileHero: mobileHeroImage,
      video: page?.video,
      quotes: quotes.map((quote: any) => quote.fields)
    },
  }
}

export default function Home({
  hero,
  mobileHero,
  pageTitle,
  quotes,
  video
} : {
  hero: ContentfulImage,
  mobileHero: ContentfulImage,
  pageTitle: string
  quotes: any[]
  video: any
}) {
  return (
    <Layout
      pageTitle="Home"
    >
      <Hero
        spaced={false}
        Image={Image}
        desktopImg={hero}
        mobileImg={mobileHero}
        overlay={false}
        imagePosition='top'
      />

      <div className='bg-primary-700 flex flex-col gap-8 lg:gap-16 justify-center items-center py-8 lg:py-16 px-4'>
        <AnimateIn className='container aspect-video'>
          <Video 
            title={video.fields.title}
            link={video.fields.youTubeLink}
            prominent
            className='w-full'
            />
        </AnimateIn>

        <div className='container grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {
            quotes.map((quote, index) => {
              return (
                <AnimateIn delay={index * 350} key={index} className='flex'>
                  <div className={`flex flex-col gap-3 ${index !== quotes.length -1 ? 'lg:border-r border-primary-300 border-opacity-20' : ''} text-center items-center lg:items-start lg:text-left px-3`}>
                    <BiSolidQuoteAltLeft className='text-accent-500 opacity-90 text-3xl' />
                    <blockquote className='text-xl lg:text-3xl font-bold text-primary-300 leading-normal'>{quote.quote}</blockquote>
                    <p className='text-white italic opacity-80'>- {quote.author}</p>
                  </div>
                </AnimateIn>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}
