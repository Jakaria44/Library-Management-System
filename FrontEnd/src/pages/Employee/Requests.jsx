import { CheckCircleOutline, DeleteForever } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import {
  GridActionsCellItem,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const Application = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryOptions, setQueryOptions] = useState({
    sort: "REQUEST_DATE",
    order: "DESC",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [returnDate, setReturnDate] = useState(
    dayjs(dayjs(new Date()).add(7, "days").format("YYYY-MM-DD"))
  );
  useEffect(() => {
    fetchData();
  }, [queryOptions]);

  const handleAcceptRequest = useCallback((row) => async () => {
    try {
      let date = new Date();
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Accept This Request?
          </Typography>
        ),
        content: (
          <Box>
            <Typography variant="body2">
              Select Return Date for "{row.NAME}"
            </Typography>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem>
                <DateTimePicker
                  disablePast
                  formatDensity="spacious"
                  format="DD-MMMM-YYYY HH:mm"
                  // viewRenderers={{
                  //   hours: renderTimeViewClock,
                  //   minutes: renderTimeViewClock,
                  //   seconds: renderTimeViewClock,
                  // }}
                  value={returnDate}
                  onChange={(newValue) => {
                    date = newValue.toDate();
                    console.log(date);
                    return setReturnDate(newValue);
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </Box>
        ),
      });

      try {
        console.log(row.USER_ID, row.EDITION_ID, date);
        const res = await server.post("/handle-request", {
          USER_ID: row.USER_ID,
          EDITION_ID: row.EDITION_ID,
          RETURN_DATE: date,
        });
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        fetchData();
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const handleDeleteRequest = useCallback((row) => async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete This Request?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete {row.NAME}'s request?
          </Typography>
        ),
      });

      try {
        console.log(row.EDITION_ID, row.USER_ID);
        const res = await server.delete("/handle-request", {
          data: {
            USER_ID: row.USER_ID,
            EDITION_ID: row.EDITION_ID,
          },
        });
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  });

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
      const response = await server.get("/all-requests", {
        params: queryOptions,
      });
      const data = response.data.map((item) => ({
        id: item.EDITION_ID + item.USER_ID,
        USER_ID: item.USER_ID,
        ISBN: item.ISBN,
        EMAIL: item.EMAIL,
        TITLE: item.TITLE,
        NAME: item.NAME,
        EDITION_ID: item.EDITION_ID,
        EDITION_NUM: item.EDITION_NUM,
        NUM_OF_COPIES: item.NUM_OF_COPIES,
        REQUEST_DATE: TimeFormat(item.REQUEST_DATE),
      }));
      setRows(data);
    } catch (error) {
      setRows([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ margin: "16px" }}>
        {rows.length !== 0 && <GridToolbarExport />}
      </GridToolbarContainer>
    );
  }

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
          { field: "NAME", headerName: "Name", width: 150 },
          { field: "EMAIL", headerName: "Email", width: 200 },
          { field: "TITLE", headerName: "Title", minWidth: 300 },
          { field: "EDITION_NUM", headerName: "Edition", width: 80 },
          { field: "NUM_OF_COPIES", headerName: "Available Copy", width: 120 },
          { field: "REQUEST_DATE", headerName: "Request Date", width: 200 },
          {
            field: "ISBN",
            headerName: "Action",
            type: "actions",
            getActions: (params) => [
              <GridActionsCellItem
                icon={<DeleteForever />}
                label="Delete"
                color="error"
                onClick={handleDeleteRequest(params.row)}
              />,
              <GridActionsCellItem
                icon={<CheckCircleOutline />}
                label="Accept"
                color="success"
                onClick={handleAcceptRequest(params.row)}
              />,
            ],
            width: 150,
          },
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
      <SuccessfullModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          fetchData();
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          fetchData();
        }}
      />
    </Box>
  );
};

export default Application;
