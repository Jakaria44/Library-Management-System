import { Box, Grid, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React, { useCallback, useEffect, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import TextArea from "../../component/TextArea";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
import SendMessage from "./SendMessage";
import Message from "./SendMessage";
const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const Application = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryOptions, setQueryOptions] = useState({
    sort: "STATUS",
    order: "DESC",
  });

  useEffect(() => {
    fetchData();
  }, [queryOptions]);

  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel);
    setQueryOptions({
      sort: sortModel[0]?.field || "REQUEST_DATE",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    });
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await server.get("/running-fine", {
        params: queryOptions,
      });

      const data = response.data.map((item) => ({
        id: item.RENT_HISTORY_ID,
        USER_ID: item.USER_ID,
        ISBN: item.ISBN,
        EMAIL: item.EMAIL,
        NAME: item.NAME,
        EDITION_ID: item.EDITION_ID,
        START_DATE: TimeFormat(item.START_DATE),
        FEE_AMOUNT: item.FEE_AMOUNT,
      }));
      setRows(data);
    } catch (error) {
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
        p={2}
        component="div"
      >
        ALL Requests
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={[
          {
            field: "NAME",
            headerName: "Name",
            renderCell: (params) => (
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body2">{params.row.NAME}</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Message user={params.row} />
                </Grid>
              </Grid>
            ),
            width: 240,
          },
          { field: "EMAIL", headerName: "Email", width: 250 },
          { field: "ISBN", headerName: "ISBN", minWidth: 200 },
          { field: "FEE_AMOUNT", headerName: "Amount (Tk)", width: 200 },
          { field: "START_DATE", headerName: "Start Date", width: 200 },
          // {
          //   field: "ISBN",
          //   headerName: "Action",
          //   type: "actions",
          //   getActions: (params) => [
          //     <GridActionsCellItem
          //       icon={<DeleteForever />}
          //       label="Delete"
          //       color="error"
          //       onClick={handleDeleteRequest(params.row)}
          //     />,
          //     <GridActionsCellItem
          //       icon={<CheckCircleOutline />}
          //       label="Accept"
          //       color="success"
          //       onClick={handleAcceptRequest(params.row)}
          //     />,
          //   ],
          //   width: 150,
          // },
        ]}
        loading={loading}
        pagination
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
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
