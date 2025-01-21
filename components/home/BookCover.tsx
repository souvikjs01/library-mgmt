import React from 'react'

type BookCoverVarient = "extraSmall" | "small" | "medium" | "regular" | "wide" ;
const varientStyles : Record<BookCoverVarient, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}

interface Props {
    className?: string;
    varient?: BookCoverVarient;
    coverColor: string;
    coverUrl: string;
}
export default function BookCover({
    className, 
    varient = "regular" , 
    coverColor="#012B48", 
    coverUrl = "https://placehold.co/400*600.png"
}: Props) {
  return (
    <div>
      
    </div>
  )
}
