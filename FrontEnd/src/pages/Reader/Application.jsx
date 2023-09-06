import { Delete } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
import React, { useCallback, useEffect, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
import { Link } from "react-router-dom";
const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const Application = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryOptions, setQueryOptions] = useState({
    sort: "REQUEST_DATE",
    order: "DESC",
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
      const response = await server.get(
        "http://localhost:3000/db-api/my-requests",
        {
          params: queryOptions,
        }
      );
      const data = response.data.map((item) => ({
        id: item.EDITION_ID,
        ISBN: item.ISBN,
        TITLE: item.TITLE,
        EDITION_ID: item.EDITION_ID,
        EDITION_NUM: item.EDITION_NUM,
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
  const handleDelete = () => {
    console.log(selected);
    if (selected.length === 0) return;
    confirm({
      title: <Typography variant="h4">Delete Requests</Typography>,
      description: `Are you sure you want to delete ${selected.length} requests?`,
    })
      .then((res) => {
        console.log(selected);

        // Send DELETE request to the server
        server
          .delete("/del-requests", {
            data: { Editions: selected },
          })
          .then((res) => {
            console.log("Deleted items:", res.data);
            setSelected([]); // Clear selected rows
            fetchData(); // Refresh data after deletion
            setShowSuccessMessage(true);
          })
          .catch((error) => {
            console.error("Error deleting items:", error);
            setShowErrorMessage(true);
          });
      })
      .catch((error) => {
        console.error("Error deleting items:", error);
      });
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ margin: "16px" }}>
        {rows.length !== 0 && <GridToolbarExport />}
        <IconButton
          sx={{ display: `${selected.length === 0 ? "none" : "block"}` }}
          onClick={handleDelete}
          color="primary"
          aria-label="add an alarm"
        >
          <Delete />
        </IconButton>
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
        My Requests
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
          { field: "REQUEST_DATE", headerName: "Request Date", width: 200 },
        ]}
        loading={loading}
        pagination
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => setSelected(newSelection)}
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
      />
      {showSuccessMessage && (
        <SuccessfullModal
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          successMessage="Deleted Successfully"
          HandleModalClosed={() => {
            setShowSuccessMessage(false);
          }}
        />
      )}
      {showErrorMessage && (
        <ErrorModal
          showErrorMessage={showErrorMessage}
          errorMessage="At least one of your selected application is not available. Please reload to view changes"
          HandleModalClosed={() => {
            setShowErrorMessage(false);
          }}
        />
      )}
    </Box>
  );
};

export default Application;
