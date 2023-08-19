import  { useEffect, useState } from 'react'
import { Grid } from '@mui/material'


import server from "./../HTTP/httpCommonParam";

const Details = () => {
const [data, setData] = useState(null);

  const loadData = async () => {
    const response = await server.get(`/book?id=${window.location.pathname.split("/")[2]}`);
    setData(response.data);

  }
  useEffect(() => {
    loadData();
  },[]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container   >
          {data &&  <img src={data.IMAGE} alt={data.TITLE} loading="lazy"/>}
        </Grid>
        <Grid item xs={12} sm={6} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {data && <h1>{data.TITLE}</h1>}
              {data && <h5>{data.DESCRIPTION}</h5>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Details;

