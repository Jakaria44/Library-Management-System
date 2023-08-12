import {useEffect, useState} from "react";
import back from "../HTTP/httpCommonParam.js";


export default function Homepage(){

  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);
    const getAllBooks = async () => {
      try {
        const books = await back.get("/all-books");
        setAllBooks(books.data);
        console.log(books.data);
      } catch (error) {
        console.log(error);
      }
    };
    return (
    //     render the books
    <>
    <div className="container">

      <ol >
        { allBooks && allBooks.map((book, i) => (

            <li key={i}>{book.TITLE}</li>

        ))}
      </ol>
    </div>
    </>
    )
}


