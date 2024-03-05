import React from 'react'

const Container = ({
  children,
  className
} : {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className={`w-full h-full container bg-gray-200 my-16 ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Container
