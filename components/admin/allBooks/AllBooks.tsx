import { prisma } from '@/lib/prisma'
import React from 'react'
import { PencilIcon, TrashIcon } from "lucide-react"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const getAllBooks = async () => {
  try {
    const books = await prisma.book.findMany()
    if(!books) {
      return { success: false, error: "error while fetching" }
    }
    return { success: true, data: books }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal server error" }
  }
  
}

async function AllBooks() {
  const books = await getAllBooks();
  if(!books.data) {
    return null
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1">
        <div className="">
          {/* Books table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b px-2">
                  <th className="py-6 text-left text-sm font-medium text-gray-500 w-[30%]">Book Title</th>
                  <th className="py-6 text-center text-sm font-medium text-gray-500 w-[20%]">Author</th>
                  <th className="py-6 text-center text-sm font-medium text-gray-500 w-[20%]">Genre</th>
                  <th className="py-6 text-center text-sm font-medium text-gray-500 w-[10%]">Date Created</th>
                  <th className="py-6 text-center text-sm font-medium text-gray-500 w-[10%]">View</th>
                  <th className="py-6 text-center text-sm font-medium text-gray-500 w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.data.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-2 w-[30%] text-center">
                      <div className="flex items-center gap-3">
                        {/* <div
                          className={`w-8 h-10 bg-${book.coverColor} flex items-center justify-center rounded border border-gray-200`}
                        >
                          <Image src={book.coverUrl} alt='img' height={4} width={4} className="text-gray-500" />
                        </div> */}
                        <span className="font-medium text-sm">{book.title}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 w-[20%] text-gray-600 text-sm text-center">{book.author}</td>
                    <td className="px-2 py-2 w-[20%] text-gray-600 text-sm text-center">{book.genre}</td>
                    <td className="px-2 py-2 w-[10%] text-gray-600 text-sm text-center">
                      {new Date(book.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </td>
                    <td className="px-2 py-2 w-[10%] text-center">
                      <Button
                        className='text-blue-600 hover:text-blue-800 text-sm'
                        variant="ghost"
                        asChild
                      >
                        <Link href={`/admin/books/${book.id}`}>
                          View        
                        </Link>
                      </Button>
                    </td>
                    <td className="px-2 py-2 w-[10%] text-center">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-green-600 hover:text-green-800">
                          <PencilIcon size={14} />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800">
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AllBooks
