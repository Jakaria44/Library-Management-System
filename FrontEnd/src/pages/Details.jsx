// import React from "react";
// import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
// import CircularSpinner from "../component/CircularSpinner";
// export async function loader() {
  
//   return defer({
//     bookDetails: server.get(`/book?id=${URLSearchParams.get("id")}`),
//   });
// }

// const Details = () => {
//   const bookDetails  = useLoaderData();


//   return (
//     <React.Suspense fallback={<CircularSpinner/>}>
//         <Await
//           resolve={bookDetails}
//           errorElement={
//             <p style={{ margin: "auto" }}>Error loading info!</p>
//           }
//         >
//           <BookDetails />
//         </Await>
//       </React.Suspense>
//   );
// };

// export default Details;


import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useParams,
} from 'react-router-dom'
import server from "./../HTTP/httpCommonParam";
// import BooksList from "./BooksList";
// import Filters from "./Filters";

import { Grid } from "@mui/material";
import React, { useEffect } from 'react'
import CircularSpinner from "../component/CircularSpinner";

export async function loader({ request }) {
  console.log(request);
  const id = request.url.split("/").pop();
  // console.log(id);
  return defer({
    bookDetails: server.get(`/book?id=${id}`),
  });
}
const Details = () => {
  const { bookDetails } = useLoaderData();

  // console.log(bookDetails.data);

  return (
    <Grid container spacing={2}>
      {/* <Filters /> */}
      <React.Suspense fallback={<CircularSpinner/>}>
        <Await
          resolve={bookDetails}
          errorElement={
            <p style={{ margin: "auto" }}>Error loading book details!</p>
          }
        >
          <BookDetails />
        </Await>
      </React.Suspense>
    </Grid>
  );
};

export default Details;



const BookDetails = ()=>{
  const {data} = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);

  return(
    <div>
      {data &&  <h1>{data?.TITLE}</h1>}


    </div>
  )
}