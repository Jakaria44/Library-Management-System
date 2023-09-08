import React from "react";
import { useParams } from "react-router-dom";
import AllBooks, { defaultQueryOptions } from "./allbooks/AllBooks";

const SingleCategory = () => {
  const { id, name } = useParams();

  return (
    <AllBooks
      queries={{ ...defaultQueryOptions, GENRE_ID: id }}
      title={`Showing Books of category: ${name}`}
    />
  );
};

export default SingleCategory;
