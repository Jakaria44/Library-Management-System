import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { AuthorDetails } from "./Details/Description";
import AllBooks, { defaultQueryOptions } from "./allbooks/AllBooks";

const SingleAuthor = () => {
  const { id, name } = useParams();

  return (
    <>
      <Typography textAlign="center" variant="h3" gutterBottom>
        {name}
      </Typography>{" "}
      <AuthorDetails id={id} />
      <AllBooks
        queries={{ ...defaultQueryOptions, AUTHOR_ID: id }}
        title={`Showing Books of Author: ${name}`}
      />
    </>
  );
};

export default SingleAuthor;
