import React, { useEffect } from 'react'
import { Await, defer, useAsyncValue, useLoaderData } from 'react-router-dom'
import server from "./../HTTP/httpCommonParam";

export async function loader() {
  return defer({
    // TODO : CHANGE THIS
    bookDetails: server.get("/all-books-sum"),
  });
}

const Details = () => {
  const { bookDetails } = useLoaderData();


  return (
    <>
      <React.Suspense
        fallback={<p style={{ margin: "auto" }}>Book Details...</p>}
      >
        <Await
          resolve={bookDetails}
          errorElement={
            <p style={{ margin: "auto" }}>Error loading books information!</p>
          }
        >
          <BookDetails book={bookDetails} />
        </Await>
      </React.Suspense>
    </>
  );
};

export default Details;

const BookDetails = ({ book }) => {
  const { data } = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <div>details</div>
    </>
  );
};
