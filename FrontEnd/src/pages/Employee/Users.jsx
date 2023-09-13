import { Avatar, Box, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
import React, { useCallback, useEffect, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
import Message from "./SendMessage";
const NoRequestOverlay = () => <CustomNoRowsOverlay text="No User to show" />;

const Users = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [queryOptions, setQueryOptions] = useState({
  //   sort: "NAME",
  //   order: "DESC",
  // });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // useEffect(() => {
  //   fetchData();
  // }, [queryOptions]);
  useEffect(() => {
    fetchData({
      sort: "NAME",
      order: "DESC",
    });
  }, []);

  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel);
    const query = {
      sort: sortModel[0]?.field || "NAME",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    };

    fetchData(query);
  }, []);

  const fetchData = async (queryOptions) => {
    try {
      setLoading(true);
      const response = await server.get("/all-users", {
        params: {
          ...queryOptions,

          USER: true,
          EMPLOYEE: true,
          ADMIN: true,
        },
      });
      console.log(response);
      const data = response.data.map((item) => ({
        id: item.USER_ID,
        USER_ID: item.USER_ID,
        IMAGE: item.IMAGE,
        NAME: item.NAME,
        ADDRESS: item.ADDRESS,
        EMAIL: item.EMAIL,
        CONTACT_NO: item.CONTACT_NO,
        GENDER: item.GENDER,
        ROLE: item.ROLE,
      }));
      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
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
        Users Info
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={[
          {
            field: "IMAGE",
            headerName: "Avatar",
            renderCell: (params) => (
              <Avatar alt={params.row.NAME} src={params.row.IMAGE} />
            ),
            width: 100,
            sortable: false,
          },
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
          { field: "EMAIL", headerName: "Email", width: 240 },
          { field: "ROLE", headerName: "Role", width: 100 },
          { field: "ADDRESS", headerName: "Address", width: 290 },
          { field: "CONTACT_NO", headerName: "Contact No.", width: 170 },
          { field: "GENDER", headerName: "Gender", width: 120 },
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
        // disableColumnFilter
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
          }}
        />
      )}
      {showErrorMessage && (
        <ErrorModal
          showErrorMessage={showErrorMessage}
          errorMessage={errorMessage}
          HandleModalClosed={() => {
            setShowErrorMessage(false);
          }}
        />
      )}
    </Box>
  );
};

export default Users;
