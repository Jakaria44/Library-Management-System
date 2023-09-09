import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CheckCircle, Error } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StyledDataGrid from "../../component/StyledDataGrid";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
import Message from "./SendMessage";
const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const Application = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData({
      sort: "START_DATE",
      order: "DESC",
    });
  }, []);

  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel);
    const query = {
      sort: sortModel[0]?.field || "START_DATE",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    };

    fetchData(query);
  }, []);

  const fetchData = async (queryOptions) => {
    try {
      setLoading(true);
      const response = await server.get("/all-fine", {
        params: {
          ...queryOptions,
          CHECK: true,
        },
      });

      console.log("all due data", response.data);
      const data = response.data.map((item) => ({
        id: item.RENT_HISTORY_ID,
        USER_ID: item.USER_ID,
        ISBN: item.ISBN,
        EMAIL: item.EMAIL,
        NAME: item.NAME,
        TITLE: item.TITLE,
        EDITION_ID: item.EDITION_ID,
        EDITION_NUM: item.EDITION_NUM,
        PAYMENT_DATE: item.PAYMENT_DATE ? TimeFormat(item.PAYMENT_DATE) : "-",
        START_DATE: TimeFormat(item.START_DATE),
        FEE_AMOUNT: item.FEE_AMOUNT,
        STATUS: item.PAYMENT_DATE ? 1 : 0,
      }));
      console.log(data);
      setRows(data);
    } catch (error) {
      setRows([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height="85%">
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        // p={2}
        component="div"
      >
        All Fine List
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={[
          {
            field: "NAME",
            headerName: "Name",
            renderCell: (params) => (
              // <Grid container direction="row" alignItems="center" spacing={1}>
              //   <Grid item xs={8}>
              //     <Typography variant="body2">{params.row.NAME}</Typography>
              //   </Grid>

              //   <Grid item xs={2}>
              //     <Message user={params.row} />
              //   </Grid>
              // </Grid>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography variant="body2">{params.row.NAME}</Typography>
                <Message user={params.row} />
              </Box>
            ),
            width: 200,
          },
          { field: "EMAIL", headerName: "Email", width: 200 },
          {
            field: "TITLE",
            headerName: "Title",
            minWidth: 300,
            renderCell: (params) => (
              <Tooltip title="see this book">
                <Typography
                  component={Link}
                  to={`/details/${params.row.ISBN}`}
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                >
                  {params.row.TITLE}
                </Typography>
              </Tooltip>
            ),
          },
          {
            field: "FEE_AMOUNT",
            headerName: "Amount (Tk)",
            width: 100,
            renderCell: (params) => (
              <Typography variant="body2"> {params.row.FEE_AMOUNT}</Typography>
            ),
          },
          { field: "START_DATE", headerName: "Start Date", width: 160 },
          { field: "PAYMENT_DATE", headerName: "Payment Date", width: 160 },
          {
            field: "STATUS",
            headerName: "Status",
            width: 80,
            renderCell: (params) => (
              <Tooltip title={params.row.STATUS ? "paid" : "Not paid"}>
                <IconButton color={params.row.STATUS ? "success" : "error"}>
                  {params.row.STATUS ? <CheckCircle /> : <Error />}
                </IconButton>
              </Tooltip>
            ),
          },
        ]}
        loading={loading}
        pagination
        sortingMode={rows.length > 100 ? "server" : "client"}
        onSortModelChange={rows.length > 100 ? handleSortModelChange : null}
        slots={{
          noRowsOverlay: NoRequestOverlay,
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        disableColumnFilter
        disableDensitySelector
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Application;
