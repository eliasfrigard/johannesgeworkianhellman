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
      <Container>
          <div className='container flex justify-center items-center flex-wrap'>
            <div className={`container grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-6 px-2`}>
              {videos.map((video, index) => (
                <Video
                  prominent={index === 0}
                  key={video.fields.youTubeLink}
                  title={video.fields.title}
                  link={video.fields.youTubeLink}
                />
              ))}
            </div>
          </div>
      </Container>
    </Layout>
  )
}

export default Music
