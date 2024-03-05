import Link from 'next/link'
import Image from 'next/image'

import Layout from "@/layouts/default"
import Container from "@/components/Container"
import AnimateIn from "@/components/AnimateIn"

import { Hero } from 'eliasfrigard-reusable-components/dist/app'

export default function Home() {
  const image = {
    url: '/johannes-1.jpeg',
    altText: 'Johannes Geworkian Hellman'
  }

  return (
    <Layout
      pageTitle='Johannes Geworkian Hellman'
      pageDescription='Johannes Geworkian Hellman is a composer and musician based in Stockholm, Sweden.'
    >
      <Hero
        spaced={false}
        Image={Image}
        desktopImg={image}
        mobileImg={image}
        overlay={false}
        imagePosition='top'
      />

      <Container>
        <p>abc</p>
      </Container>
    </Layout>
  )
}
