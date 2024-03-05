import React from 'react'

const Hamburger = ({ 
    active, 
    handleClick 
  }:{
    active: boolean,
    handleClick: () => void
  }) => {
  return (
    <div className='burger' onClick={handleClick}>
      <div className={`burgerLine duration-300 ${active && 'transform rotate-45 translate-y-[4px]'}`}></div>
      <div className={`burgerLine duration-300 ${active && 'hidden'}`}></div>
      <div className={`burgerLine duration-300 ${active && 'transform -rotate-45 -translate-y-[5px]'}`}></div>
    </div>
  )
}

export default Hamburger
