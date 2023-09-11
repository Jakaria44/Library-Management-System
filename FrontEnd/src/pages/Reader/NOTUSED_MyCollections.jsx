import { Chip } from "@mui/material";
import { Tooltip } from "@mui/material/";
import Box from "@mui/material/Box";
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
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useMemo, useState } from "react";
import TimeFormat from "../../utils/TimeFormat";
import server from "../../HTTP/httpCommonParam";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";

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
  edition
  number of copies
  rent date
  return date, 
  status,
*/
const headCells = [
  {
    id: "title",
    disablePadding: true,
    label: "Title of the Book",
    align: "left",
  },
  {
    id: "edition",
    disablePadding: false,
    label: "Edition",
    align: "right",
  },
  {
    id: "rentDate",
    disablePadding: false,
    label: "Rent Date",
    align: "right",
  },
  {
    id: "returnDate",
    disablePadding: false,
    label: "Return Date",
    align: "right",
  },
  {
    id: "status",
    disablePadding: false,
    label: "Status",
    align: "center",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="normal"
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

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
          My Collections
        </Typography>
      }
    </Toolbar>
  );
}

export default function MyCollections() {
  const [rows, setRows] = useState([]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getAllCollections = async () => {
    try {
      const response = await server.get("/my-rent-history");
      console.log(response.data);
      // RENT_HISTORY_ID": "2",
      // "ISBN": "9781408834992",
      // "TITLE": "Harry Potter and the Goblet of Fire",
      // "EDITION_ID": "7",
      // "EDITION_NUM": 1,
      // "RENT_DATE": "2023-08-25T10:08:32.000Z",
      // "RETURN_DATE": "2023-09-01T10:08:32.000Z",
      // "STATUS": 1
      const newRows = response.data.map((row) => {
        return {
          title: row.TITLE,
          edition: row.EDITION_NUM,
          rentDate: TimeFormat(row.RENT_DATE),
          returnDate: TimeFormat(row.RETURN_DATE),
          status: row.STATUS === 1 ? "Returned" : "Not Returned",
          isbn: row.ISBN,
          edition_id: row.EDITION_ID,
        };
      });
      console.log(newRows);
      setRows(newRows);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllCollections();
    console.log(emptyRows);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const HandleReturnBook = async (edition_id) => {
    try {
      // const res = server.delete("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() => {
    console.log(rows);
    return stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="h3" align="center" m={2}>
                      You have read 1 / ♾️ books in your life!! Try one before
                      you DIE
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.isbn)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.isbn}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align={headCells[1].align}>
                      {row.edition}
                    </TableCell>
                    <TableCell align={headCells[2].align}>
                      {row.rentDate}
                    </TableCell>
                    <TableCell align={headCells[3].align}>
                      {row.returnDate}
                    </TableCell>

                    <TableCell align={headCells[4].align}>
                      <Tooltip
                        title={
                          row.status === "Returned"
                            ? "You Returned the book "
                            : "Return Now"
                        }
                      >
                        <Chip
                          label={row.status}
                          color={
                            row.status === "Returned" ? "success" : "error"
                          }
                          clickable={row.status === "Not Returned"}
                          onClick={() => {
                            HandleReturnBook(row.edition_id);
                          }}
                        />
                      </Tooltip>
                    </TableCell>
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
      <SpinnerWithBackdrop
        backdropOpen={!visibleRows.length && rows.length}
        helperText="Loading..."
      />
    </Box>
  );
}
