import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout({
  children,
  pageTitle,
  pageDescription,
  imageUrl,
  pageUrl,
  footer = true,
  transparent = true,
  titleHidden = false,
  headerFadeIn = false,
}: {
  children: React.ReactNode
  pageTitle: string
  pageDescription: string
  imageUrl: string
  pageUrl: string
  footer?: boolean
  transparent?: boolean
  headerFadeIn?: boolean
  titleHidden?: boolean
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const author = 'Elias Frigård'
  const pageName = 'Johannes Geworkian Hellman'

  const title = `${pageTitle} | ${pageName}`
  const baseUrl = 'https://www.johannesgeworkianhellman.com'
  const faviconUrl = '/favicon.ico'

  const routes = [
    { href: '/', label: 'home' },
    { href: '/biography', label: 'biography' },
    { href: '/projects', label: 'projects' },
    { href: '/music', label: 'music' },
    { href: '/calendar', label: 'calendar' },
    { href: '/contact', label: 'contact' },
  ]

  const socialMedia = {
    facebook: 'https://www.facebook.com/veerakuisma',
    instagram: 'https://www.instagram.com/veerakuisma',
    youtube: 'https://www.youtube.com/veerakuisma',
    phone: '+358 40 123 4567',
    email: 'abcd@ema.fi',
    youTube: 'abcdema',
    spotify: 'https://open.spotify.com/artist/veerakuisma',
  }

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <title>{title}</title>
        <link rel='icon' href={faviconUrl} />
        <link rel='canonical' href={baseUrl + pageUrl} />
        <meta name='description' content={pageDescription} />
        <meta name='author' content={author} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='index,follow' />
        <meta itemProp='image' content={imageUrl} />
        <meta property='og:title' content={title} key='title' />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:url' content={baseUrl + pageUrl} />
        <meta property='og:type' content='website' />
      </Head>
      <Header
        transparent={transparent}
        currentRoute={router.pathname}
        routes={routes} 
        socialMedia={socialMedia} 
        pageName={pageName} 
        uppercaseLinks={false} 
        font='font-khorla'
        titleHidden={titleHidden}
      />
      <main
        style={{ transition: 'opacity-90 200ms ease-out' }}
        className={`minContainerHeight bg-primary-100 pt-[85px] fade-in ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </main>

      {footer && <Footer author={author} pageName={pageName} />}
    </>
  )
}
