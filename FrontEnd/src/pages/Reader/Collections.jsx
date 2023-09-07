import { CheckCircle, Error } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import { GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfulModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";

// import { alpha, styled } from "@mui/material/styles";
// import { gridClasses } from "@mui/x-data-grid";

// const ODD_OPACITY = 0.2;

// const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
//   [`& .${gridClasses.row}.even`]: {
//     backgroundColor: alpha(
//       theme.palette.primary.dark,
//       ODD_OPACITY + theme.palette.action.selectedOpacity
//     ),
//     "&:hover, &.Mui-hovered": {
//       backgroundColor: alpha(
//         theme.palette.primary.main,
//         ODD_OPACITY +
//           theme.palette.action.selectedOpacity +
//           theme.palette.action.hoverOpacity
//       ),
//       // Reset on touch devices, it doesn't add specificity
//       "@media (hover: none)": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           ODD_OPACITY + theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));

const NoRowsOverlay = () => (
  <CustomNoRowsOverlay text="You have no Books in your collection" />
);

const Collections = () => {
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
  const fetchData = async (query) => {
    try {
      setLoading(true);
      const response = await server.get("/my-rent-history", {
        params: query,
      });

      const data = response.data.map((item) => ({
        id: item.RENT_HISTORY_ID,
        ISBN: item.ISBN,
        TITLE: item.TITLE,
        EDITION_ID: item.EDITION_ID,
        EDITION_NUM: item.EDITION_NUM,
        RENT_DATE: TimeFormat(item.RENT_DATE),
        RETURN_DATE: TimeFormat(item.RETURN_DATE),
        STATUS: item.STATUS,
      }));
      setRows(data);
    } catch (error) {
      setRows([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = React.useCallback(
    (row) => async () => {
      if (row.STATUS === 1) return;
      const data = {
        RENT_HISTORY_ID: row.id,
      };
      try {
        await confirm({
          title: (
            <Typography variant="h4">
              Return the book <i>{row.TITLE}</i> now?
            </Typography>
          ),
          description: "This action cannot be undone",
        });
        try {
          const res = await server.put("/return-book", {
            RENT_HISTORY_ID: row.id,
          });
          setSuccessMessage(res.data.message);
          setShowSuccessMessage(true);
        } catch (err) {
          setErrorMessage(err.response.data.message);
          setShowErrorMessage(true);
        }
      } catch (err) {
        console.log("cancelled");
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
        p={2}
        component="div"
      >
        My Collections
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
          { field: "RENT_DATE", headerName: "Rent Date", width: 200 },
          { field: "RETURN_DATE", headerName: "Return Date", width: 200 },
          {
            field: "STATUS",
            headerName: "Status",
            sortable: true,
            type: "actions",
            getActions: (params) => [
              <Tooltip
                title={params.row.STATUS === 1 ? "Returned" : "Return Now"}
              >
                <GridActionsCellItem
                  icon={params.row.STATUS === 1 ? <CheckCircle /> : <Error />}
                  label={params.row.STATUS === 1 ? "Returned" : "Not Returned"}
                  color={params.row.STATUS === 1 ? "success" : "error"}
                  onClick={handleReturnBook(params.row)}
                />
              </Tooltip>,
            ],
            width: 150,
          },
        ]}
        loading={loading}
        pagination
        disableRowSelectionOnClick
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
        disableColumnFilter
        disableDensitySelector
      />
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
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
          fetchData();
          setShowErrorMessage(false);
        }}
      />
    </Box>
  );
};

export default Collections;
