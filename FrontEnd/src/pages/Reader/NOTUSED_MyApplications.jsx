import DeleteIcon from "@mui/icons-material/Delete";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useMemo, useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import SuccessfullModal from "../../component/SuccessfulModal";
import server from "../../HTTP/httpCommonParam";
import TimeFormat from "../../utils/TimeFormat";

// comparator
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  if (!array) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/*
  title, 
  edition,
  request date
*/
const headCells = [
  {
    id: "title",
    disablePadding: false,
    label: "Title of the Book",
    align: "left",
  },
  {
    id: "edition",
    disablePadding: false,
    label: "Edition",
    align: "center",
  },
  {
    id: "requestDate",
    disablePadding: false,
    label: "Application Date",
    align: "center",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, deleteItemsHandler } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
          My Applications
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={deleteItemsHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function MyCollections() {
  const confirm = useConfirm();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState();
  const [deleting, setDeleting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const getApplications = async () => {
    try {
      const response = await server.get("/my-requests");
      console.log(response.data);

      const newRows = response.data.map((row) => {
        return {
          id: row.EDITION_ID,
          title: row.TITLE,
          edition: row.EDITION_NUM,
          requestDate: TimeFormat(row.REQUEST_DATE),
          isbn: row.ISBN,
        };
      });
      console.log(newRows);
      setRows(newRows);
    } catch (err) {}
  };
  useEffect(() => {
    getApplications();
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      //
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      // TODO :   sorting query here.
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );
  const deleteItems = async () => {
    setDeleting(true);
    try {
      const response = await server.delete("/del-requests", {
        data: { Editions: selected },
      });
      setShowSuccessMessage(true);
    } catch (err) {
      if (err.response.status === 404) {
        setShowErrorMessage(true);
      }
    }
  };

  const deleteItemsHandler = () => {
    // TODO : delete items here.
    confirm({
      title: <Typography variant="h4">Delete Applications</Typography>,
      description: `Are you sure you want to delete ${selected.length} applications?`,
    })
      .then(() => {
        deleteItems();
      })
      .catch(() => {
        console.log("canceled");
      });
  };

  return rows ? (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteItemsHandler={deleteItemsHandler}
        />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {deleting ? (
              <TableBody>
                <TableRow align="center">
                  <TableCell colSpan={4}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.title}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="center">{row.edition}</TableCell>
                      <TableCell align="center">{row.requestDate}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {showSuccessMessage && (
        <SuccessfullModal
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          successMessage="Deleted Successfully"
          HandleModalClosed={() => {
            getApplications();
            setSelected([]);
            setShowSuccessMessage(false);
            setDeleting(false);
          }}
        />
      )}
      {showErrorMessage && (
        <ErrorModal
          showErrorMessage={showErrorMessage}
          errorMessage="At least one of your selected application is not available. Please reload to view changes"
          HandleModalClosed={() => {
            getApplications();
            setSelected([]);
            setShowErrorMessage(false);
            setDeleting(false);
          }}
        />
      )}
    </Box>
  ) : (
    <Typography variant="h3">You have no pending book request</Typography>
  );
}
