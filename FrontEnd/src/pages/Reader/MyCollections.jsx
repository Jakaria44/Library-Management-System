import { Chip } from "@mui/material";
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
import { useMemo, useState } from "react";

function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (Note: January is 0)
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`;
}
let i = 0;
function createData(title, edition, rentDate, returnDate, status) {
  const formattedRentDate = formatDateToDDMMYYYY(rentDate);
  const formattedReturnDate = formatDateToDDMMYYYY(returnDate);
  i++;
  return {
    title,
    edition,
    rentDate: formattedRentDate,
    returnDate: formattedReturnDate,
    status,
    isbn: i + "",
  };
}

const rows = [
  createData(
    "The Great Gatsby and Artificial Intelligence",
    3,
    new Date("2-10-2023"),
    new Date("6-15-2023"),
    "Not Returned",
    "A123"
  ),

  createData(
    "Pride and Prejudice and Web Development",
    1,
    new Date("3-5-2023"),
    new Date("4-15-2023"),
    "Returned",
    "B456"
  ),

  createData(
    "To Kill a Mockingbird and Data Analysis",
    2,
    new Date("1-15-2023"),
    new Date("5-30-2023"),
    "Not Returned",
    "C789"
  ),

  createData(
    "1984 and Machine Learning",
    4,
    new Date("4-2-2023"),
    new Date("8-20-2023"),
    "Not Returned",
    "D012"
  ),

  createData(
    "The Catcher in the Rye and Frontend Development",
    1,
    new Date("2-28-2023"),
    new Date("3-15-2023"),
    "Returned",
    "E345"
  ),

  createData(
    "Brave New World and Database Management",
    2,
    new Date("3-10-2023"),
    new Date("7-5-2023"),
    "Returned",
    "F678"
  ),

  createData(
    "Lord of the Rings and Artificial Intelligence",
    3,
    new Date("5-10-2023"),
    new Date("9-20-2023"),
    "Not Returned",
    "G901"
  ),

  createData(
    "Moby-Dick and Data Science",
    1,
    new Date("1-5-2023"),
    new Date("2-15-2023"),
    "Returned",
    "H234"
  ),

  createData(
    "The Odyssey and Web Development",
    2,
    new Date("2-15-2023"),
    new Date("6-30-2023"),
    "Not Returned",
    "I567"
  ),

  createData(
    "Frankenstein and Machine Learning",
    4,
    new Date("4-10-2023"),
    new Date("8-25-2023"),
    "Not Returned",
    "J890"
  ),
];

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
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    [order, orderBy, page, rowsPerPage]
  );

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
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.isbn)}
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
                      <Chip
                        label={row.status}
                        color={
                          row.status === "Returned"
                            ? "success"
                            : row.status === "Not Returned"
                            ? "primary"
                            : "error"
                        }
                      />
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
    </Box>
  );
}
