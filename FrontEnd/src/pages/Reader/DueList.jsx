import { CheckCircle, Error } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import {
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
import React, { useCallback, useEffect, useState } from "react";
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
      sort: sortModel[0]?.field || "STATUS",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    });
  }, []);
  const fetchData = async () => {
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
        PAYMENT_DATE_DATE: item.RETURN_DATE
          ? TimeFormat(item.RETURN_DATE)
          : "-",
        STATUS: item.RETURN_DATE ? 1 : 0,
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

  const handlePayNow = React.useCallback(
    (row) => async () => {
      if (row.STATUS === 1) return;
      try {
        await confirm({
          title: (
            <Typography variant="h4">
              Are you sure you want to pay now?
            </Typography>
          ),
          description: "This action cannot be undone",
        });
        // const res = await server.post("/return-book", data);
        setShowSuccessMessage(true);
      } catch (err) {
        console.log("cancelled");
      }
      // try {
      //   const res = await server.post("/return-book", data);
      //   fetchData();
      // } catch (err) {
      //   console.log(err);
      // }
    },
    []
  );

  return (
    <Box height="85%">
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        p={2}
        component="div"
      >
        My Fine History
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={[
          { field: "ISBN", headerName: "ISBN", width: 150 },
          { field: "TITLE", headerName: "Title", minWidth: 300 },
          { field: "EDITION_NUM", headerName: "Edition ", width: 100 },
          { field: "START_DATE", headerName: "Start Date", width: 200 },
          {
            field: "PAYMENT_DATE",
            headerName: "Payment Date",
            width: 200,
          },
          { field: "FEE_AMOUNT", headerName: "Amount (Tk)", width: 150 },
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
        disableRowSelectionOnClick
        loading={loading}
        pagination
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          toolbar: CustomToolbar,
        }}
      />
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage="We've recieved your fine. Now you can get more books!"
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
    </Box>
  );
};

export default DueList;
