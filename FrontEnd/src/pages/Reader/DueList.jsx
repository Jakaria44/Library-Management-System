import { CheckCircle, Error } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import {
  GridActionsCellItem,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfulModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
const NoRowsOverlay = () => (
  <CustomNoRowsOverlay text="You have no Dues to pay!" />
);

const DueList = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData({
      sort: "STATUS",
      order: "DESC",
    });
  }, []);

  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel);
    const query = {
      sort: sortModel[0]?.field || "STATUS",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    };

    fetchData(query);
  }, []);
  const fetchData = async (queryOptions) => {
    try {
      setLoading(true);
      const response = await server.get("/my-fine-history", {
        params: queryOptions,
      });

      const data = response.data.map((item) => ({
        id: item.RENT_HISTORY_ID,
        ISBN: item.ISBN,
        TITLE: item.TITLE,
        EDITION_ID: item.EDITION_ID,
        EDITION_NUM: item.EDITION_NUM,
        START_DATE: TimeFormat(item.START_DATE),
        PAYMENT_DATE: item.PAYMENT_DATE ? TimeFormat(item.PAYMENT_DATE) : "-",
        STATUS: item.PAYMENT_DATE ? 1 : 0,
        FEE_AMOUNT: '$ '+item.FEE_AMOUNT.toFixed(3),
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ margin: "16px" }}>
        {rows.length !== 0 && <GridToolbarExport />}
      </GridToolbarContainer>
    );
  }

  const handlePayNow = React.useCallback(
    (row) => async () => {
      if (row.STATUS === 1) return;
      try {
        await confirm({
          title: <Typography variant="h4">Pay now?</Typography>,
          description: "This action cannot be undone",
        });
        try {
          const res = await server.put("/return-book", {
            RENT_HISTORY_ID: row.id,
            PAY: true,
          });
          setSuccessMessage(res.data.message);
          setShowSuccessMessage(true);
        } catch (err) {
          setErrorMessage(err.response.data.message);
          setShowErrorMessage(true);
        }
      } catch (err) {
        console.log("cancelled");
      } finally {
        fetchData();
      }
    },
    []
  );

  return (
    <Box height="85%">
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        // p={2}
        component="div"
      >
        My Fine History
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={[
          { field: "ISBN", headerName: "ISBN", width: 150 },
          {
            field: "TITLE",
            headerName: "Title",
            minWidth: 320,
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
          { field: "EDITION_NUM", headerName: "Edition ", width: 100 },
          { field: "START_DATE", headerName: "Start Date", width: 200 },
          {
            field: "PAYMENT_DATE",
            headerName: "Payment Date",
            width: 200,
          },
          { field: "FEE_AMOUNT", headerName: "Amount", width: 150 },
          {
            field: "STATUS",
            headerName: "Status",
            type: "actions",
            getActions: (params) => [
              <Tooltip title={params.row.STATUS === 1 ? "Paid" : "Pay Now"}>
                <GridActionsCellItem
                  icon={params.row.STATUS === 1 ? <CheckCircle /> : <Error />}
                  label={params.row.STATUS === 1 ? "Paid" : "Not Paid"}
                  color={params.row.STATUS === 1 ? "success" : "error"}
                  onClick={handlePayNow(params.row)}
                />
              </Tooltip>,
            ],
            width: 100,
          },
        ]}
        loading={loading}
        pagination
        sortingMode={rows.length > 100 ? "server" : "client"}
        onSortModelChange={rows.length > 100 ? handleSortModelChange : null}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        // disableColumnFilter
        disableDensitySelector
        disableRowSelectionOnClick
      />
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
    </Box>
  );
};

export default DueList;
