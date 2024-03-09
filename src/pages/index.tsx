import Image from 'next/image'
import Layout from "@/layouts/default"
import Container from "@/components/Container"
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

  return {
    props: {
      hero: heroImage,
      mobileHero: mobileHeroImage,
      pageTitle: page.title,
    },
  }
}

export default function Home({
  hero,
  mobileHero
} : {
  hero: ContentfulImage,
  mobileHero: ContentfulImage,
}) {
  return (
    <Layout
      titleHidden
      pageTitle='Johannes Geworkian Hellman'
      pageDescription='Johannes Geworkian Hellman is a composer and musician based in Stockholm, Sweden.'
    >
      <Hero
        spaced={false}
        Image={Image}
        desktopImg={hero}
        mobileImg={mobileHero}
        overlay={false}
        imagePosition='top'
      />
    </Layout>
  )
}
