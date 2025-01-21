import BookList from "@/components/home/BookList"
import BookOverview from "@/components/home/BookOverview"
import { sampleBooks } from "@/constants"

const page = () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]}/>

      <BookList 

      />
    </>
  )
}

export default page

