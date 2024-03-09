import Image from 'next/image'
import Layout from "@/layouts/default"
import Band from '@/components/Band'
import Container from '@/components/Container'
import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'

import {
  Hero,
  AnimateIn,
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
      bands: page.projects
    },
  }
}

const About = ({
  hero,
  mobileHero,
  pageTitle,
  text,
  bands
} : {
  hero: { altText: string, url: string },
  mobileHero: { altText: string, url: string },
  pageTitle: string,
  text: string
  bands: any[]
}) => {
  return (
    <Layout transparent={false}>
      <Container className='flex flex-col justify-center items-center gap-8 lg:gap-16'>
        <Hero
          spaced={true}
          Image={Image}
          desktopImg={hero}
          mobileImg={mobileHero}
          overlay={true}
          imagePosition='top'
          overlayClasses='bg-primary-700 bg-opacity-40 backdrop-blur'
        >
          <TextLayout text={text} className='text-white prose-headings:text-white z-10' />
        </Hero>

        {
          bands.map((band, index) => {
            return (
              <>
                <Band
                  key={index}
                  name={band.fields.name}
                  shortName={band.fields.shortName}
                  biography={band.fields.text}
                  image={band.fields.image}
                  website={band.fields.website}
                  spotify={band.fields.spotify}
                  youTube={band.fields.youTube}
                  facebook={band.fields.facebook}
                />
                <div className='h-[1px] w-3/4 bg-primary-300 rounded-full'></div>
              </>
            )
          })
        }
      </Container>
    </Layout>
  )
}

export default About
