'use client'
import config from '@/lib/config'
import { IKVideo, ImageKitProvider } from 'imagekitio-next'
import React from 'react'

function BookVideo({ videoUrl}: {videoUrl: string}) {
  return (
    <ImageKitProvider 
        publicKey={config.env.imagekit.publicKey}
        urlEndpoint={config.env.imagekit.urlEndPoint}
    >
        <IKVideo 
            path={videoUrl}
            controls={true}
            className=' w-full rounded-xl'
        />
    </ImageKitProvider>
  )
}

export default BookVideo
