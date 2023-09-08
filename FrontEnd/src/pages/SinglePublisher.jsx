import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicationComponent from "./Details/PublicationComponent";
import AllBooks, { defaultQueryOptions } from "./allbooks/AllBooks";
const SingleAuthor = () => {
  const { id, name } = useParams();

  return (
    <>
      <Typography textAlign="center" variant="h3" gutterBottom>
        {name}
      </Typography>
      <PublicationComponent id={id} />
      <AllBooks
        queries={{ ...defaultQueryOptions, PUBLISHER_ID: id }}
        title={`Showing Books published by : ${name}`}
      />
    </>
  );
};

export default SingleAuthor;
