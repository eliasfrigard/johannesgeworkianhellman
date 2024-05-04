import Layout from "@/layouts/default"

import type { ContentfulImage } from '@/types'

import { createClient } from 'contentful'
import { getPlaiceholder } from 'plaiceholder'

import ImageLayout from '@/components/ImageLayout'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
  })

  const pageRes = await contentful.getEntries({
    content_type: 'photoGallery',
  })

  const allImages: ContentfulImage[] = []
  
  for (const gallery of pageRes.items) {
    if (!gallery?.fields?.photos) continue
    
    const images: any[] = gallery?.fields?.photos as any[]
    
    for (const image of images) {
      const src = 'https:' + image?.fields?.file?.url
      const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))
      const { base64 } = await getPlaiceholder(buffer)
    
      allImages.push({
        url: src,
        blur: base64,
        altText: image?.fields?.title
      })
    }
  }

return {
    props: {
      images: allImages
    }
  }
}

const handleOpenModal = (index: number) => {}

const About = ({
  images
} : {
  images: ContentfulImage[]
}) => {
  return (
    <Layout transparent={false} pageTitle='Gallery'>
      <div className='w-screen grid grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 mt-3 lg:mt-8 mb-3 lg:mb-8 px-3 lg:px-8'>
        {
          images.map((image, index) => (
            <ImageLayout handleOnClick={() => handleOpenModal(index)} key={image.url} index={index} image={image} />
          ))
        }
      </div>
    </Layout>
  )
}

export default About
