import Layout from '@/layouts/default'
import Video from '@/components/Video'
import Container from '@/components/Container'

import { createClient } from 'contentful'

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
  })

  const pageRes = await contentful.getEntries({
    content_type: 'musicPage',
  })

  const page = pageRes.items[0].fields

  return {
    props: {
      pageTitle: page.name,
      videos: page.videos,
    },
  }
}

const Music = ({
  pageTitle,
  videos,
} : {
  pageTitle: string,
  videos: any[],
}) => {
  return (
    <Layout pageTitle={pageTitle} transparent={false}>
        <div className={`w-full grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-6 mt-8 px-8`}>
          {videos.map((video, index) => (
            <Video
              prominent={index === 0}
              key={video.fields.youTubeLink}
              title={video.fields.title}
              link={video.fields.youTubeLink}
            />
          ))}
        </div>
    </Layout>
  )
}

export default Music
