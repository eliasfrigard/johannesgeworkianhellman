import React from 'react'

const Container = ({
  children,
  className
} : {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className='w-full flex justify-center items-center px-3 md:px-0'>
      <div className={`w-full h-full container ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Container
