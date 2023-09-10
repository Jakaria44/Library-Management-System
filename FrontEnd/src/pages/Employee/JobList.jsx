import { DeleteForever, Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  Input,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useConfirm } from "material-ui-confirm";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React, { useCallback, useEffect, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import StyledDataGrid from "../../component/StyledDataGrid";
import SuccessfullModal from "../../component/SuccessfulModal";
import server from "./../../HTTP/httpCommonParam";
import CustomNoRowsOverlay from "./../../component/CustomNoRowsOverlay";
const NoRequestOverlay = () => (
  <CustomNoRowsOverlay text="No Pending Requests" />
);

const JobList = () => {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [queryOptions, setQueryOptions] = useState({
    sort: "JOB_TITLE",
    order: "DESC",
  });

  const modifyJob = useCallback(({ JOB_TITLE, SALARY }) => async () => {
    try {
      let salary = SALARY;
      let title = JOB_TITLE;
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Modify Job
          </Typography>
        ),
        content: (
          <Box>
            <Typography variant="body2">Edit the Job</Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              mt={2}
            >
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                label="Job Title"
                id="title"
                variant="outlined"
                defaultValue={title}
                type="text"
                onChange={(event) => {
                  title = event.target.value;
                }}
              />
              <InputLabel htmlFor="salary">New Salary</InputLabel>
              <Input
                label="New Salary"
                variant="outlined"
                defaultValue={salary}
                type="number"
                min={1}
                max={10000}
                // value={salary}
                onChange={(event) => {
                  salary = event.target.value;
                }}
              />
            </Box>
          </Box>
        ),
      });
      console.log(title, salary);
      try {
        const res = await server.put("/getJob", {
          JOB_TITLE: title,
          SALARY: salary,
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
            Delete This Job?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete the job : <i>{row.JOB_TITLE}</i>?
          </Typography>
        ),
      });

      try {
        const res = await server.delete("/getJob?jid=" + row.JOB_ID);

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
      sort: sortModel[0]?.field || "JOB_TITLE",
      order: sortModel[0]?.sort === "asc" ? "ASC" : "DESC",
    };

    setQueryOptions(query);
    fetchData(query);
  }, []);

  const fetchData = async (query = queryOptions) => {
    try {
      setLoading(true);
      const response = await server.get("/getJob", {
        params: query,
      });

      const data = response.data.map((item) => ({
        id: item.JOB_ID,
        JOB_ID: item.JOB_ID,
        JOB_TITLE: item.JOB_TITLE,
        SALARY: item.SALARY,
        NUM_OF_EMPLOYEES: item.NUM_OF_EMPLOYEES,
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

  const applyForJob = async ({ id, TITLE }) => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Apply For This Job?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to apply for {TITLE}?
          </Typography>
        ),
      });
      try {
        const res = await server.post("/apply?jid=" + id);
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
  };
  const resignFromJob = async ({ TITLE }) => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Resign From Job?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to resign from {TITLE}?
          </Typography>
        ),
      });
      try {
        const res = await server.delete("/employee/resign");
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
  };
  const deleteApply = async ({ id, TITLE }) => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete Application?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete application for {TITLE}?
          </Typography>
        ),
      });
      try {
        const res = await server.delete("/apply?jid=" + id);
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
  };

  const tableColumns = [
    {
      field: "JOB_TITLE",
      headerName: "Job Title",
      headerAlign: "center",
      width: 210,
      align: "center",
    },
    {
      field: "SALARY",
      headerAlign: "center",
      headerName: "Base Salary",
      renderCell: (params) => (
        <Typography variant="body1">$ {params.row.SALARY}</Typography>
      ),
      align: "center",

      width: 200,
    },
    {
      field: "NUM_OF_EMPLOYEES",
      headerAlign: "center",
      headerName: "Number of Employees Working",
      width: 240,
      align: "center",
    },
  ];

  const columnForUser = {
    field: "STATUS",
    headerName: "Status",
    headerAlign: "center",
    minWidth: 120,
    align: "center",
    renderCell: (params) =>
      params.row.STATUS === "apply" ? (
        <Chip
          label={params.row.STATUS}
          onClick={() => applyForJob(params.row)}
          color="primary"
        />
      ) : params.row.STATUS === "working" ? (
        <Chip
          label={params.row.STATUS}
          onClick={() => resignFromJob(params.row)}
          color="success"
        />
      ) : (
        <Chip
          label={params.row.STATUS}
          onClick={() => deleteApply(params.row)}
          color="secondary"
        />
      ),
  };
  const columnForAdmin = {
    field: "JOB_ID",
    align: "center",
    headerAlign: "center",
    headerName: "Modify Job",
    type: "actions",
    getActions: (params) => [
      <Tooltip title="Delete Request">
        <GridActionsCellItem
          icon={<DeleteForever />}
          label="Delete"
          color="error"
          onClick={handleDeleteRequest(params.row)}
        />
      </Tooltip>,
      <Tooltip title="Accept Request">
        <GridActionsCellItem
          icon={<Edit />}
          label="Accept"
          color="success"
          onClick={modifyJob(params.row)}
        />
      </Tooltip>,
    ],
    width: 100,
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
        Job List
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={
          localStorage.getItem("role") === "admin"
            ? [...tableColumns, columnForAdmin]
            : localStorage.getItem("role") === "employee" ||
              localStorage.getItem("role") === "user"
            ? [...tableColumns, columnForUser]
            : [...tableColumns]
        }
        loading={loading}
        pagination
        sortingMode={rows.length > 2 ? "server" : "client"}
        onSortModelChange={rows.length > 2 ? handleSortModelChange : null}
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

export default JobList;
