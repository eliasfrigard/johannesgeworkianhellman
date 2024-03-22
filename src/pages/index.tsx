import Image from 'next/image'
import Layout from "@/layouts/default"
import type { ContentfulImage } from '../types'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'

import {
  Hero,
  getImageBuffer
} from 'eliasfrigard-reusable-components/dist/app'


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
      quotes: quotes.map((quote: any) => quote.fields)
    },
  }
}

export default function Home({
  hero,
  mobileHero,
  pageTitle,
  quotes
} : {
  hero: ContentfulImage,
  mobileHero: ContentfulImage,
  pageTitle: string
  quotes: any[]
}) {
  return (
    <Layout
      titleHidden
      pageTitle={pageTitle}
    >
      <Hero
        spaced={false}
        Image={Image}
        desktopImg={hero}
        mobileImg={mobileHero}
        overlay={false}
        imagePosition='top'
      />

      <div className='bg-primary-700 flex justify-center items-center'>
        <div className='container grid py-16 grid-cols-3 gap-8'>
          {
            quotes.map((quote, index) => {
              return (
                <div key={index} className='mx-auto'>
                  <blockquote className='border-l-4 border-opacity-10 rounded pl-4 text-3xl font-bold text-white leading-tight'>{quote.quote}</blockquote>
                  <p className='ml-5 mt-4 text-lg text-white italic'>- {quote.author}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}
