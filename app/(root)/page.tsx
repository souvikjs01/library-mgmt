import BookList from "@/components/home/BookList"
import BookOverview from "@/components/home/BookOverview"
// import { sampleBooks } from "@/constants"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const page = async () => {
  const session = await auth()

  const latestBooks = await prisma.book.findMany({
    orderBy: { 
      createdAt: "desc" 
    },
    take: 10,
  }) as Book[];
  
  return (
    <>
      <BookOverview 
        {...latestBooks[0]}
        userId={session?.user?.id!}
      />

      <BookList 
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-20"
      />
    </>
  )
}

export default page

