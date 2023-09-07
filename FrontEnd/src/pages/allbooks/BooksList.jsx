import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import { useMenu } from "./../../contexts/MenuContextProvider";
import BookCard from "./BookCard";
const GridForCard = styled(Grid)(({ theme }) => ({
  transition: "transform 0.3s", // Add a smooth transition
  "&:hover": {
    transform: "scale(1.05)", // Scale up by 10% on hover
  },
}));

const BooksList = ({ data, loading }) => {
  const { opened } = useMenu();

  return (
    <Grid
      item
      xs={12}
      md={opened ? 12 : 8}
      lg={opened ? 9 : 8}
      container
      direction="row"
      spacing={2}
    >
      {data.length === 0 && (
        <Grid item xs={12} md={12} lg={12}>
          <h3>No Books Found</h3>
        </Grid>
      )}
      {data?.map((books) => (
        <GridForCard
          item
          xs={12}
          sm={6}
          md={opened ? 6 : 4}
          lg={3}
          key={books.ISBN}
          margin="auto"
          paddingX={2}
          paddingY={2}
        >
          <BookCard book={books} />
        </GridForCard>
      ))}
      <SpinnerWithBackdrop backdropOpen={loading} helperText="Loading..." />
    </Grid>
  );
};

export default BooksList;
