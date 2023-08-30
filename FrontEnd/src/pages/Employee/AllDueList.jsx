import { Box, Typography } from "@mui/material";
import {
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
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
    sort: "STATUS",
    order: "DESC",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchData();
  }, [queryOptions]);

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
          { field: "NAME", headerName: "Name", width: 200 },
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
      {showSuccessMessage && (
        <SuccessfullModal
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          successMessage={successMessage}
          HandleModalClosed={() => {
            setShowSuccessMessage(false);
            fetchData();
          }}
        />
      )}
      {showErrorMessage && (
        <ErrorModal
          showErrorMessage={showErrorMessage}
          errorMessage={errorMessage}
          HandleModalClosed={() => {
            setShowErrorMessage(false);
            fetchData();
          }}
        />
      )}
    </Box>
  );
};

export default Application;
