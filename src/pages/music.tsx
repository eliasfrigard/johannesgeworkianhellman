import Layout from '@/layouts/default'
import Video from '@/components/Video'
import Album from '@/components/Album'

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
  const firstVideo = videos[0]

  return (
    <Layout pageTitle={pageTitle} transparent={false}>
      <div className='w-screen flex justify-center items-center py-16 bg-primary-700'>
        <div className='container flex flex-col justify-center items-center gap-6'>
          <div className='w-full aspect-video'>
            <Video
              prominent={true}
              key={firstVideo.fields.youTubeLink}
              title={firstVideo.fields.title}
              link={firstVideo.fields.youTubeLink}
              />
          </div>

          <div className={`w-full grid grid-flow-row ${videos.length > 1 && 'lg:grid-cols-2'} gap-6`}>
            {videos.map((video, index) => {
            if (index === 0) return null
            return (
              <Video
              prominent={false}
              key={video.fields.youTubeLink}
              title={video.fields.title}
              link={video.fields.youTubeLink}
              />
            )
            })}
          </div>
        </div>
      </div>

      <div>
        <div className='w-full flex justify-center items-center'>
          <div className='container py-16'>
            <Album
              title='Album Title'
              cover='/veera-grant.jpg'
              spotify='https://open.spotify.com/album/6qa1OBh5ZZSBMjpikd6pyP?si=-Px_xgFzR8iC1GEKhGLJVg'
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Music
