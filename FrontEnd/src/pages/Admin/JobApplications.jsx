import { ArrowUpwardRounded, DeleteForever } from "@mui/icons-material";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";

import React, { useCallback, useEffect, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import Message from "../Employee/SendMessage";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const JobApplications = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [queryOptions, setQueryOptions] = useState({
    sort: "NAME",
    order: "DESC",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePromoteRequest = useCallback((row) => async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Approve This User?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to Approve "{row.NAME}" to the job
            {row.JOB_TITLE}?
          </Typography>
        ),
      });
      try {
        const res = await server.post("/application", {
          USER_ID: row.USER_ID,
          JOB_ID: row.JOB_ID,
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

  const handleDeleteRequest = useCallback((row) => async () => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete This Application😔?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete "{row.NAME}" from application list?
          </Typography>
        ),
      });

      try {
        const res = await server.delete(
          "/employee?uid=" + row.USER_ID + "&jid=" + row.JOB_ID
        );
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel);
    const query = {
      sort: sortModel[0]?.field || "NAME",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    };
    setQueryOptions(query);

    fetchData(query);
  }, []);

  const fetchData = async (query = queryOptions) => {
    try {
      setLoading(true);
      const response = await server.get("/application", {
        params: query,
      });

      const data = response.data.map((item) => ({
        id: item.USER_ID + item.JOB_ID,
        USER_ID: item.USER_ID,
        IMAGE: item.IMAGE,
        EMAIL: item.EMAIL,
        NAME: item.NAME,
        APPLY_DATE: TimeFormat(item.APPLY_DATE),
        JOB_ID: item.JOB_ID,
        JOB_TITLE: item.JOB_TITLE,
      }));
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
        Job Applications
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
            width: 240,
          },
          { field: "EMAIL", headerName: "Email", width: 300 },

          {
            field: "JOB_TITLE",
            headerName: "Job Title",
            minWidth: 120,
          },
          { field: "APPLY_DATE", headerName: "Apply Date", width: 160 },
          {
            field: "USER_ID",
            headerName: "Action",
            type: "actions",
            getActions: (params) => [
              <Tooltip title="Accept Application">
                <GridActionsCellItem
                  icon={<ArrowUpwardRounded />}
                  label="Approve"
                  color="success"
                  onClick={handlePromoteRequest(params.row)}
                />
              </Tooltip>,
              <Tooltip title="Delete Application">
                <GridActionsCellItem
                  icon={<DeleteForever />}
                  label="Delete"
                  color="error"
                  onClick={handleDeleteRequest(params.row)}
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

export default JobApplications;
