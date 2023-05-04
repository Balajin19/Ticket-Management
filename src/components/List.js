import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import "./List.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./Pagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function List({ currentPage, setCurrentPage, recordsPerPage }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [details, setDetails] = useState(
    JSON.parse(localStorage.getItem("details"))
  );
  const [array, setArray] = useState(
    JSON.parse(localStorage.getItem("details"))
  );
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(details?.length / recordsPerPage);

  function getFilteredList(e) {
    setArray(JSON.parse(localStorage.getItem("details")));
    if (e.target.value === "clear") {
      setDetails(array);
    } else {
      const filtCheck = array.filter((item) => item.owner === e.target.value);

      if (filtCheck.length === 0) {
        setOpen(true);
        setDetails(array);
      } else if (filtCheck.length <= 3) {
        setCurrentPage(1);
        setDetails(filtCheck);
      } else {
        setDetails(filtCheck);
      }
    }
  }

  function getSortList(e, value) {
    if (localStorage.getItem("sorting") === null) {
      localStorage.setItem("sorting", "ascending");
      if (localStorage.getItem("sorting") === "ascending") {
        const ascending = [...details].sort((a, b) =>
          a[value] > b[value] ? 1 : -1
        );
        localStorage.setItem("sorting", "descending");
        setDetails(ascending);
      }
    } else {
      const descending = [...details].sort((a, b) =>
        a[value] > b[value] ? -1 : 1
      );
      localStorage.removeItem("sorting");
      setDetails(descending);
    }
  }

  const editList = (e, index) => {
    if (currentPage === 1) {
      localStorage.setItem("index", index);
    } else {
      localStorage.setItem("index", currentPage * 3 - 1 - (2 - index));
    }

    navigate("/form");
  };

  return (
    <div id="table-container">
      <div className="table-card">
        <div className="table-filter">
          <label htmlFor="names">
            <i className="fa fa-filter" aria-hidden="true"></i>{" "}
            <b>Filter by Owner:</b>
          </label>
          <select
            id="names"
            onChange={(e) => {
              getFilteredList(e);
            }}
          >
            <option value="clear">Clear</option>
            <option value="Balaji">Balaji</option>
            <option value="Bharath">Bharath</option>
            <option value="Tamil">Tamil</option>
            <option value="Manoj">Manoj</option>
            <option value="Thanigachalam">Thanigachalam</option>
            <option value="Lokesh">Lokesh</option>
          </select>
        </div>
      </div>
      <TableContainer component={Paper} id="table">
        <Table
          sx={{ minWidth: 300, maxHeight: 600, overflowX: "scroll" }}
          size="larger"
          aria-label="a dense table"
        >
          <TableHead id="header">
            <TableRow>
              <TableCell
                align="center"
                className="headingTitle"
                onClick={(e) => {
                  getSortList(e, "page");
                }}
              >
                Page
                <i className="fa fa-sort" id="sortIcon" aria-hidden="true"></i>
              </TableCell>
              <TableCell
                align="center"
                className="headingTitle"
                onClick={(e) => {
                  getSortList(e, "type");
                }}
              >
                Type
                <i className="fa fa-sort" id="sortIcon" aria-hidden="true"></i>
              </TableCell>
              <TableCell
                align="center"
                className="headingTitle"
                onClick={(e) => {
                  getSortList(e, "description");
                }}
              >
                Description <i className="fa fa-sort" aria-hidden="true"></i>
              </TableCell>
              <TableCell
                align="center"
                className="headingTitle"
                onClick={(e) => {
                  getSortList(e, "owner");
                }}
              >
                Owner
                <i className="fa fa-sort" id="sortIcon" aria-hidden="true"></i>
              </TableCell>
              <TableCell
                align="center"
                className="headingTitle"
                onClick={(e) => {
                  getSortList(e, "severity");
                }}
              >
                Severity
                <i className="fa fa-sort" id="sortIcon" aria-hidden="true"></i>
              </TableCell>
              <TableCell align="center" className="headingTitle">
                Comments
              </TableCell>
              <TableCell align="center" className="headingTitle">
                User Comments
              </TableCell>
              <TableCell align="center">Updates</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details
              ?.slice(indexOfFirstRecord, indexOfLastRecord)
              .map((value, index) => {
                console.log(value, index);
                return (
                  <>
                    <TableRow key={index} className="list">
                      <TableCell align="center" id="value">
                        {value?.page}
                      </TableCell>

                      <TableCell align="center" id="value">
                        {value.type}
                      </TableCell>

                      <TableCell align="center" id="value">
                        {value.description}
                      </TableCell>

                      <TableCell align="center" id="value">
                        {value.owner}
                      </TableCell>

                      <TableCell align="center" id="value">
                        {value.severity}
                      </TableCell>

                      <TableCell align="center" id="value">
                        {value.comments}
                      </TableCell>
                      <TableCell align="center" id="value">
                        {value.userComments}
                      </TableCell>
                      <TableCell align="center" id="value">
                        <Stack direction="row" spacing={2}>
                          <Button
                            onClick={(e) => {
                              editList(e, index);
                            }}
                          >
                            <EditIcon fontSize="small" />
                            View & Edit
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Filtered List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Empty!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Pagination
        className="pagination"
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
export default List;
