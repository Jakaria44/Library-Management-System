import { useLoaderData } from "react-router-dom";
import server from "./../../HTTP/httpCommonParam";
export async function loader() {
  const allBooks = await server.get("/all-books");
  // console.log(allBooks);
  return { allBooks };
}
const AllBooks = () => {
  const { allBooks } = useLoaderData();
  console.log(allBooks.data);
  const allBooksList = allBooks?.data?.map((book, i) => (
    <p key={i}>{book?.TITLE}</p>
  ));
  return (
    <div>
      {allBooksList}
    </div>
  );
};

export default AllBooks;
