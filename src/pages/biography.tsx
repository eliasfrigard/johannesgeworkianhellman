import Image from 'next/image'
import Layout from '@/layouts/default'
import TextLayout from '@/components/TextLayout'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'

import { Hero, AnimateIn, getImageBuffer } from 'eliasfrigard-reusable-components/dist/app'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
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
        url: heroUrl,
      },
      mobileHero: {
        altText: mobileHero ? mobileHero?.fields?.title : hero?.fields?.title,
        blur: mobileHeroBlur,
        url: mobileHeroUrl,
      },
      pageTitle: page.title,
      biography: page.biography,
    },
  }
}

const About = ({
  hero,
  mobileHero,
  pageTitle,
  biography,
}: {
  hero: { altText: string; url: string }
  mobileHero: { altText: string; url: string }
  pageTitle: string
  biography: string
}) => {
  return (
    <Layout
      transparent={true}
      pageTitle={pageTitle}
    >
      <div className='fixed w-full h-full -z-10 text-white'>
        <Hero
          spaced={false}
          Image={Image}
          desktopImg={hero}
          mobileImg={mobileHero}
          overlay={false}
          imagePosition='top'
          parallaxSpeed={0}
        >
          <div className='fixed w-full h-full bg-white opacity-30' />
        </Hero>
      </div>

      <AnimateIn
        threshold={0}
        className='text-center md:text-justify leading-[2rem] tracking-wide font-sans z-10 px-3 md:px-10 pt-2 lg:pt-0 mb-4 lg:mb-8 mt-8 lg:mt-8'
      >
        <TextLayout
          text={biography}
          className='text-primary-600 font-medium'
        />
      </AnimateIn>
    </Layout>
  )
}

export default About
