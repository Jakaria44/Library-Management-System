import React from "react";

const Draft = () => {
  return (
    <>
      {/* image */}
      <Grid item container xs={12} justifyContent="center" alignItems="center">
        <Grid item>
          <Avatar
            alt="Preview"
            src={defaultImage}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item mt={17}>
          <IconButton variant="contained" color="primary" component="label">
            <CameraAlt />
            <input
              type="file"
              accept="image/*"
              // onChange={}
              style={{ display: "none" }}
            />
          </IconButton>
        </Grid>
      </Grid>

      {/*  */}
      {/*  */}
      {/*  */}

      {/* title */}

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="title"
          label="Title of the Book"
          name="title"
          onChange={(e) =>
            setBook((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </Grid>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}

      {/* isbn */}
      <Grid item xs={12} sm={7}>
        <TextField
          required
          fullWidth
          id="isbn"
          label="ISBN"
          name="isbn"
          type="number"
          error={!isISBNValid}
          onChange={(e) =>
            setBook((prev) => ({ ...prev, isbn: e.target.value }))
          }
          helperText={isISBNValid ? "" : "Please enter a valid ISBN"}
        />
      </Grid>
      {/*  */}
      {/*  */}
      {/*  */}

      {/* pagenum */}
      <Grid item xs={12} sm={5}>
        <TextField
          required
          fullWidth
          id="pageNumber"
          label="Page Number"
          name="pageNumber"
          type="number"
          onChange={(e) =>
            setBook((prev) => ({
              ...prev,
              numberOfPages: e.target.value,
            }))
          }
        />
      </Grid>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* summary */}
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          multiline
          maxRows={4}
          id="description"
          label="Description of the Book"
          name="description"
          onChange={(e) =>
            setBook((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Grid>

      {/*  */}
    </>
  );
};

export default Draft;
