import React from 'react'
import { assets } from '../assets/assets';
import {motion} from 'framer-motion'

const Description = () => {

  return (
    <motion.div 
     initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
    className='flex flex-col items-center justify-center
    my-24 p-6 md:px-28'>
      <h1 
          className='text-3xl sm:text-4xl font-semibold mb-2'>
          Create AI Images
      </h1>
      <p className='text-gray-500 mb-8'>
        Trun your words into a picture
      </p>
   
   <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
    <img 
    src={assets.sample_img_1} 
    alt="" 
    className='w-80 xl:w-96 rounded-lg' />
    <div>
        <h2 
        className='text-3xl font-medium max-w-lg mb-4'>
          Introducing the AI-Powered Text to Image Generator.
        </h2>
        <p className='text-gray-600 mb-4'>
            Easily bring your ideas to life with our free AI-powered text to image generator. 
            Simply enter a description, and the AI will create a unique image based on your words in seconds.
            Imagine it, Describe it, and watch it to come in life.
        </p>
        <p className='text-gray-600'>
            Simply type the text prompt, and our cutting-edge AI will generate high-quality images in seconds.
            From product visuals to character design and portraits, even concepts that don't yet exist can eb visualized effortlessly.
            Powered by advanced AI technology, the creative possibilities are limitless.
        </p>
   
    </div>
   </div>
   
   
    </motion.div>
  )
}

export default Description;