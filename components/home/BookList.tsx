import React from 'react'
import BookCard from './BookCard';

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

export default function BookList({ title, books, containerClassName }: Props) {
  return (
    <section className={containerClassName}>
      <h2 className='text-4xl text-light-100'>
        Popular Books
      </h2>

      <ul className='book-list'>
        {books.map((book) => (
          <BookCard key={book.title} {...book}/>
        ))}
      </ul>
    </section>
  )
}
