import React from 'react'
import { Products } from '../types'

interface propsCard{
    name: string,
    description: string,
    imgURI: string,
    price: number 
}

export default function CardProducts ({name, description, imgURI, price} : propsCard) {
  return (
    <div className='bg-dark rounded-md w-[25%] cursor-pointer mx-3 bg-[#c5c5c559] backdrop-blur-lg'>
        <section className='title flex justify-between px-4 py-2 bg-gray-500 rounded-t-md'>
            <h1 className='text-white text-base'>{name}</h1>
            <h2 className='text-gray-700'>{price}$</h2> 
        </section>
        <div className='hover:bg-gradient-to-tr from-black via-black to-blue-800 rounded-b-md h-[95%]'>
            <section className='px-4 pt-8 pb-4'>
                <img src={imgURI} className='w-[auto] h-[30vh] hover:scale-105 rounded-md mx-auto' alt='name' />
                <p className='text-gray-400 mt-5'>{description}</p>
            </section>
        </div>
    </div>
  )
}
