import React from 'react'

const Container = ({
  children
} : {
  children: React.ReactNode
}) => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full h-full container bg-gray-200 my-16'>
        {children}
      </div>
    </div>
  )
}

export default Container
