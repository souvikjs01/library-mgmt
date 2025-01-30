import BookList from "@/components/home/BookList"
import BookOverview from "@/components/home/BookOverview"
import { sampleBooks } from "@/constants"

const page = () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]}/>

      <BookList 
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-20"
      />
    </>
  )
}

export default page

