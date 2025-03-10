"use client"
import React, { useRef, useState } from 'react'
import { 
  IKImage, 
  ImageKitProvider, IKUpload,
  IKVideo
} from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from "sonner"
import { cn } from '@/lib/utils';

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
    console.log("Failed to authenticate");
    throw new Error("Internal server error ")    
  }
}
interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light'
  onFileChange: (filePath: string) => void;
  value?: string;
}
export default function FileUpload({ type, accept, placeholder, folder, variant, onFileChange, value }: Props) {
  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{ filePath: string | null}>({filePath: value ?? null})  
  const [progress, setProgress] = useState(0);
  
  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-loght-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  }

  const onError = (error : any) => {
    console.log("err is :" + error);
    toast(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    })    
  }
  const onSuccess = (res: any) => {
    setFile(res)
    onFileChange(res.filePath)

    toast(`${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully`,
    })
  }

  const onValidate = (file: File) => {
    if(type === 'image') {
      // > 20 MB
      if(file.size > 20 * 1024 * 1024) {
        toast("File size is too large", {
          description: "Please upload a file that is less than 20MB in size",
        })
        return false
      }
    } else if(type === 'video') {
      if(file.size > 50 * 1024 * 1024) {
        toast("File size is too large", {
          description: "Please upload a file that is less than 50MB in size",
        })
        return false
      }
    }
    return true
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
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({loaded, total}) => {
          const percent = Math.round((loaded/total) * 100)
          setProgress(percent)
        }}
        folder={folder}
        accept={accept}
      />
      <button 
        className={cn('flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md', styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if(ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click()
          }
        }}
      >
        <Image src="/icons/upload.svg" alt='upload-icons' width={20} height={20} className=' object-contain'/>

        <p className={cn(' text-base text-light-100', styles.placeholder)}>{placeholder}</p>
      </button>
      
      {progress > 0 && progress !==100 && (
        <div className=' w-full bg-green-200 rounded-full'>
          <div className="rounded-full bg-green-800 p-0.5 text-center font-bebas-neue text-[8px] font-bold leading-none text-light-100" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file && (
        (type === 'image' ? (
          <IKImage 
            alt={file.filePath!}
            path={file.filePath!}
            width={500}
            height={500}
          />
        ) : type === 'video' ? (
          <IKVideo 
            path={file.filePath!}
            controls={true}
            className='h-96 w-full rounded-xl'
          />
        ) : null)        
      )}
    </ImageKitProvider>
  )
}
