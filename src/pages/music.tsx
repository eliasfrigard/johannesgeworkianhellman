import Layout from '@/layouts/default'
import Video from '@/components/Video'
import Album from '@/components/Album'
import AnimateIn from '@/components/AnimateIn'

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
      albums: page.albums,
    },
  }
}

const Music = ({
  pageTitle,
  videos,
  albums
} : {
  pageTitle: string,
  videos: any[],
  albums: any[]
}) => {
  const firstVideo = videos[0]

  return (
    <Layout pageTitle={pageTitle} transparent={false}>
      <div className='w-full flex justify-center items-center pt-[calc(85px+2rem)] pb-16 bg-primary-700 -mt-[85px]'>
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
        <div className='w-full flex justify-center items-center pt-16 pb-8'>
          <div className='container flex flex-col gap-12'>
            {
              albums.map((album, index) => {
                return (
                  <Album
                    key={index}
                    flipped={index % 2 === 0}
                    title={album.fields.title}
                    cover={'https:' + album.fields.albumCover.fields.file.url}
                    spotify={album.fields.spotifyUrl}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Music
