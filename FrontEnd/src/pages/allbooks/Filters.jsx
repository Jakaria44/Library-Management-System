import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";

const Filters = () => {
  const handleSubmit = () => (e) => {
    e.preventDefault();
    // search();
  };

  const filterFields = {
    search: {
      label: "Search",
      placeholder: "Search Anything",
    },
    author: {
      name: "author",
      label: "Author",
      placeholder: "Author",
    },
  };
  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ paddingX: { xs: 2, md: 0 } }} elevation={5}>
        <CardHeader title="Filters" />
        <CardContent sx={{ pt: 0 }}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
            onSubmit={handleSubmit()}
          >
            <TextField
              // {...register("q")}
              label={filterFields.search.label}
              placeholder={filterFields.search.placeholder}
              margin="normal"
              fullWidth
              autoFocus
              size="small"
            />
            {/* <Controller

                name={filterFields.author.name}
                render={({ field }) => (
                  <Autocomplete                  
                    multiple
                    onChange={(_, value) => {
                      field.onChange(value.map((p) => p.text ?? p));
                    }}
                    getOptionLabel={(item) => {
                      return item?.text ? item.text : item;
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      option?.id?.toString() ===
                        (value?.id ?? value)?.toString()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("orders.filter.status.label")}
                        placeholder={t("orders.filter.status.placeholder")}
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              /> */}

            <br />
            <Button variant="contained">Submit</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Filters;
