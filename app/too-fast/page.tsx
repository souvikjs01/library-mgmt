import React from 'react'

function page() {
  return (
    <div className='root-container flex min-h-screen flex-col items-center justify-center'>
      <h1 className=' text-5xl font-bold text-light-100'>
        Whoa, Slow Down There, Speedy!
      </h1>
      
      <p className=' text-center mt-3 max-w-xl text-lime-400'>
        Looks like you&apos;ve been a little too eager. We&apos;ve pul a temporary pause on your exitement. Chill for 
        a bit, and try again shortly.
      </p>
    </div>
  )
}

export default page
