import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div className='relative min-h-96 size-2/4'>
        <Image src={'/logo.png'} alt='kohi tech' fill />
      </div>
    </header>
  )
}
