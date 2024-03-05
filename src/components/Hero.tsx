import React from 'react'
import Image from 'next/image'
import { AnimateIn } from 'eliasfrigard-reusable-components/dist/app'

import { useParallax } from "react-scroll-parallax"

const Hero = ({
  children,
  className,
  desktopImg,
  mobileImg,
  overlay = true,
  spacedHero = false
}: {
  children: React.ReactNode
  className?: string
  desktopImg: {
    image: string
    altText: string
    blur?: string
  }
  mobileImg: {
    image: string
    altText: string
    blur?: string
  }
  overlay?: boolean
  spacedHero?: boolean
}) => {
  if (!desktopImg && !mobileImg) return null

  if (spacedHero) {
    return (
      <AnimateIn className='relative w-full aspect-[9/16] md:aspect-video'>
        {
          desktopImg.image && (
            <Image
              alt={desktopImg.altText}
              src={desktopImg.image + '?w=800'}
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              className='hidden md:block object-cover rounded shadow'
              placeholder={desktopImg?.blur ? 'blur' : 'empty'}
              blurDataURL={desktopImg?.blur}
            />
          )
        }

        {
          mobileImg.image && (
            <Image
              alt={mobileImg.altText}
              src={mobileImg.image + '?w=600'}
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              className='md:hidden object-cover object-bottom rounded shadow'
              placeholder={mobileImg?.blur ? 'blur' : 'empty'}
              blurDataURL={mobileImg?.blur}
            />
          )
        }
      </AnimateIn>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks  
  const parallax = useParallax({ speed: -40 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mobileParallax = useParallax({ speed: -50 })

  return (
    <AnimateIn className={className}>
      <div id='hero' className='relative h-screen w-full -mt-[85px] flex justify-center items-center shadow-lg overflow-hidden'>
        {
          desktopImg.image && (
            <Image
            // @ts-ignore
            ref={parallax.ref}
            alt={desktopImg.altText}
            src={desktopImg.image + '?w=800'}
            fill
            sizes="(min-width: 768px) 80vw, 100vw"
            className={`hidden md:block object-cover`}
            placeholder={desktopImg?.blur ? 'blur' : 'empty'}
            blurDataURL={desktopImg?.blur}
            />
          )
        }

        {
          mobileImg.image && (
            <Image
              // @ts-ignore
              ref={mobileParallax.ref}
              alt={mobileImg.altText}
              src={mobileImg.image + '?w=600'}
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              className='md:hidden object-cover object-bottom'
              placeholder={mobileImg?.blur ? 'blur' : 'empty'}
              blurDataURL={mobileImg?.blur}
            />
          )
        }

        {overlay && (
          <AnimateIn
            delay={1000}
            className='absolute w-full h-screen bg-primary-950 bg-opacity-70 backdrop-blur'
          >
            <></>
          </AnimateIn>
        )}

        <div className='z-10 mt-85 centerContent px-4'>
          {children}
        </div>
      </div>
    </AnimateIn>
  )
}

export default Hero
