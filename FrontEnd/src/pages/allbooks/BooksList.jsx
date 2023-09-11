import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardSkeleton from "../../component/CardSkeleton";
import { useMenu } from "./../../contexts/MenuContextProvider";
import BookCard from "./BookCard";
const GridForCard = styled(Grid)(({ theme }) => ({
  transition: "transform 0.3s", // Add a smooth transition
  "&:hover": {
    transform: "scale(1.03)", // Scale up by 10% on hover
  },
}));

const BooksList = ({ data, loading }) => {
  // const { menuOpened } = useMenu();

  // const opened = useMenu().menuOpened.opened;
  // console.log(opened);
  console.log(data);
  return (
    <Grid item xs={12} md={8} lg={9} container direction="row" spacing={2}>
      {data.length === 0 && !loading && (
        <Grid item xs={12} md={12} lg={12}>
          <h3>No Books Found</h3>
        </Grid>
      )}
      {!loading &&
        data?.map((books) => (
          <GridForCard
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={books.ISBN}
            margin="auto"
            paddingX={2}
            paddingY={2}
          >
            <BookCard book={books} />
          </GridForCard>
        ))}
      {/* <SpinnerWithBackdrop backdropOpen={loading} helperText="Loading..." /> */}

      {loading &&
        new Array(8).fill(0).map((_, index) => (
          <GridForCard
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            margin="auto"
            paddingX={2}
            paddingY={2}
          >
            <CardSkeleton />
          </GridForCard>
        ))}
    </Grid>
  );
};

export default BooksList;
