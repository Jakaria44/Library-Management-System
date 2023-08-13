import {useEffect, useState} from "react";
import server from '../HTTP/httpCommonParam.js';

export default function AllBooks(){
  const [allBooks, setAllBooks] = useState([]);
  const getAllBooks= async()=>{
     const books = await server.get('/all-books-sum');
     setAllBooks(books.data);

  }
  useEffect(() => {
     getAllBooks();

  }, []);
  return (
    <>

        {allBooks && <ol>{allBooks.map((book, i) => (
            <li key={i}>
              title : {book.TITLE}
            </li>
        ))}</ol>}



    </>
  )
}


