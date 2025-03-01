import React from 'react'
import { 
    Calendar, 
    Edit, 
    Maximize, 
    Play, 
    Settings, 
    SkipBack, 
    Subtitles, 
    Volume2 
} from 'lucide-react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getBookDetails } from '@/actions/book';
import { toast } from 'sonner';
import BookVideo from '@/components/home/BookVideo';
import BookCover from '@/components/home/BookCover';


export default async function BookDetails({ id }: { id: string}) {    
  const book = await getBookDetails(id)
  if(book.error) {
    toast("Error", {
        description: book.error
    })
    return null
  }
  return (
    <div className="container mx-auto p-4">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            {/* Book image */}
            <div className="bg-teal-50 p-6 rounded-lg flex items-center justify-center">
                <BookCover 
                    coverImage={book.data?.coverUrl!}
                    coverColor={book.data?.coverColor!}
                />
            </div>

            {/* Book info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-500">
                <span>Created At:</span>
                <Calendar className="h-4 w-4" />
                <span>
                    {new Date(book.data?.createdAt!).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                    })}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{book.data?.title}</h1>
                <p className="text-xl">{book.data?.author}</p>
                <p className="text-gray-500 capitalize">{book.data?.genre}</p>
              </div>

              <p className="text-gray-700">
                {book.data?.description}
              </p>

              <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                <Edit className="mr-2 h-4 w-4" /> Edit Book
              </Button>
            </div>
          </div>

          {/* Additional sections */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Summary section */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
              <p className="text-gray-700">
                {book.data?.summary}
              </p>
            </div>

            {/* Video section */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Video</h2>
              <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=360&width=640"
                    alt="Video thumbnail"
                    width={640}
                    height={360}
                    className="object-cover"
                  />
                </div>

                {/* Video controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent object-fill">
                  <BookVideo videoUrl={book.data?.videoUrl!}/>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
