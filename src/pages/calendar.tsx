import Layout from "@/layouts/default"
import { createClient } from 'contentful'
import Concert from "@/components/Concert"

export async function getStaticProps() {
  const contentful = createClient({
    space: process.env.SPACE_ID || '',
    accessToken: process.env.ACCESS_TOKEN || '',
  })

  const pageRes = await contentful.getEntries({
    content_type: 'biographyPage',
  })

  const page = pageRes.items[0].fields

  return {
    props: {
      pageTitle: page.title,
    },
  }
}

const About = ({
  pageTitle,
} : {
  pageTitle: string,
}) => {
  return (
    <Layout transparent={false} pageTitle={pageTitle}>
      <div className="container mx-auto my-16 flex flex-col justify-center items-center gap-6">
        <Concert 
          description="Symbio @	Moriska Paviljongen"
          location="Malmö, Sweden"
          facebook="https://www.facebook.com/"
          website="https://www.google.com/"
          tickets="https://www.google.com/"
        />
        <Concert 
          description="Symbio @	Nygatan 6 - Musik i Syd"
          location="Växjö, Sweden"
          website="https://www.google.com/"
          tickets="https://www.google.com/"
        />
        <Concert 
          description="Maija Kauhanen & Johannes Geworkian Hellman @	Stallet - Världens Musik"
          location="Stockholm, Sweden"
        />
      </div>
    </Layout>
  )
}

export default About
