"use client"
import React, { useRef, useState } from 'react'
import { 
  IKImage, 
  ImageKitProvider, IKUpload
} from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from "sonner"

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);

    if(!res.ok) {
        const errorText = await res.text()

        throw new Error(`Request failed with response status ${res.status}: ${errorText}`)
    }
    // everything ok 
    const data = await res.json();
    const { signature, expire, token } = data
    
    return { token, expire, signature }
  } catch (error) {
    
  }
}

export default function UploadImage({onFileChange}: {onFileChange: (filePath: string) => void}) {
  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)  
  
  const onError = (error : any) => {
    console.log(error);

    toast("Image upload failed", {
      description: `Your image could not be uploaded. Please try again.`,
    })    
  }
  const onSuccess = (res: any) => {
    setFile(res)
    onFileChange(res.filePath)

    toast("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    })
  }

  return (
    <ImageKitProvider 
      publicKey={config.env.imagekit.publicKey} 
      urlEndpoint={config.env.imagekit.urlEndPoint}
      authenticator={authenticator as any}
    >
      <IKUpload 
        className='hidden' 
        ref={ikUploadRef} 
        onError={onError} 
        onSuccess={onSuccess}
        fileName='test-upload.png'
      />
      <button 
        className='flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md'
        onClick={(e) => {
          e.preventDefault();
          if(ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click()
          }
        }}
      >
        <Image src="/icons/upload.svg" alt='upload-icons' width={20} height={20} className=' object-contain'/>

        <p className=' text-base text-light-100'>Upload a File</p>
        {file && (
          <p className='mt-1 text-center text-xs'>{file.filePath}</p>
        )}
      </button>

      {file && (
        <IKImage 
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}
