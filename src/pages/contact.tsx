import Image from 'next/image'
import Layout from "@/layouts/default"
import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'


import {
  Hero,
  getImageBuffer
} from 'eliasfrigard-reusable-components/dist/app'

import TextLayout from '@/components/TextLayout'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
  })

  const pageRes = await contentful.getEntries({
    content_type: 'projectsPage',
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
      pageTitle: page.title,
      text: page.text,
    },
  }
}

const Contact = ({
  hero,
  mobileHero,
  pageTitle,
  text,
} : {
  hero: { altText: string, url: string },
  mobileHero: { altText: string, url: string },
  pageTitle: string,
  text: string
}) => {
  return (
    <Layout transparent={true} pageTitle={pageTitle}>
        <Hero
          spaced={false}
          Image={Image}
          desktopImg={hero}
          mobileImg={mobileHero}
          overlay={true}
          imagePosition='top'
          overlayClasses='bg-primary-700 bg-opacity-40 backdrop-blur'
        >
          <TextLayout text={text} className='text-white prose-headings:text-white z-10' />
        </Hero>
    </Layout>
  )
}

export default Contact
