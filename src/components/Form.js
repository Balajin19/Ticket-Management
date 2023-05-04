import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Form.css";
export const Form = ({ currentPage, setCurrentPage }) => {
  const [page, setPage] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].page
      : []
  );
  const [type, setType] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].type
      : []
  );
  const [description, setDescription] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].description
      : []
  );
  const [owner, setOwner] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].owner
      : []
  );
  const [severity, setSeverity] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].severity
      : []
  );
  const [comments, setComments] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].comments
      : []
  );
  const [userComments, setUserComments] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("details"))[
          localStorage.getItem("index")
        ].userComments
      : []
  );

  const [list, setList] = useState(JSON.parse(localStorage.getItem("details")));
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const navigate = useNavigate();
  const SubmitForm = (e) => {
    e.preventDefault();
    if (localStorage.getItem("index") === null) {
      const arr = [
        ...list,
        { page, type, description, owner, severity, comments, userComments },
      ];

      console.log(arr);
      setList(arr);

      console.log(localStorage.getItem("index"));
      localStorage.setItem("details", JSON.stringify(arr));
    } else {
      const rows = [...list];
      const deletedArr = rows.splice(localStorage.getItem("index"), 1, {
        page,
        type,
        description,
        owner,
        severity,
        comments,
        userComments,
      });

      setList(rows);
      localStorage.setItem("details", JSON.stringify(rows));
      console.log(list);
    }
    localStorage.removeItem("index");
    navigate("/home");
  };
  const removeList = (e, index) => {
    const items = [...list];
    const deletedList = items.splice(index, 1);
    setList(items);
    console.log(items);
    localStorage.setItem("details", JSON.stringify(items));
    localStorage.removeItem("index");
    if (items.length <= 3) {
      setCurrentPage(1);
      navigate("/home");
    } else {
      navigate("/home");
    }
  };

  return (
    <section id="section">
      <div id="form-card">
        <div id="form">
          <form action="#" className="form" onSubmit={SubmitForm}>
            <h2>
              Ticket Raising
              <span>
                {localStorage.getItem("index") !== null ? (
                  <Tooltip
                    className="delete-icon"
                    style={{ color: "red" }}
                    title="Delete"
                    hidden={access !== "false" ? true : false}
                    onClick={(e) => {
                      removeList(e, localStorage.getItem("index"));
                    }}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
              </span>
            </h2>
            <table>
              <tbody>
                <tr>
                  <th>
                    Page<sup style={{ color: "red" }}>*</sup> :
                  </th>
                  <td>
                    <FormControl sx={{ m: 1, minWidth: "35ch" }}>
                      <Select
                        disabled={access !== "false" ? true : false}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        required
                        value={page}
                        onChange={(e) => {
                          const arr = (page, e.target.value);
                          setPage(arr);
                        }}
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                        <MenuItem value="About">About</MenuItem>
                        <MenuItem value="Contact">Contact</MenuItem>
                        <MenuItem value="Service">Service</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <th>
                    Type<sup style={{ color: "red" }}>*</sup> :
                  </th>

                  <td>
                    <FormControl sx={{ m: 1, minWidth: "35ch" }}>
                      <Select
                        disabled={access !== "false" ? true : false}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        required
                        value={type}
                        onChange={(e) => {
                          const arr = (type, e.target.value);
                          setType(arr);
                        }}
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="UI">UI</MenuItem>
                        <MenuItem value="Functionality">Functionality</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <th>
                    Description<sup style={{ color: "red" }}>*</sup> :
                  </th>
                  <td>
                    <TextField
                      disabled={access !== "false" ? true : false}
                      sx={{ m: 1, width: "45ch" }}
                      id="outlined-multiline-static"
                      multiline
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => {
                        const des = (description, e.target.value);
                        setDescription(des);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    Owner<sup style={{ color: "red" }}>*</sup> :
                  </th>
                  <td>
                    <Autocomplete
                      disabled={access !== "false" ? true : false}
                      value={owner}
                      required
                      onChange={(event, newValue) => {
                        setOwner(newValue);
                      }}
                      id="controllable-states-demo"
                      options={owners}
                      sx={{ width: 300, marginLeft: 1 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    Severity<sup style={{ color: "red" }}>*</sup> :
                  </th>
                  <td>
                    <FormControl sx={{ m: 1, minWidth: "35ch" }}>
                      <Select
                        disabled={access !== "false" ? true : false}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        required
                        value={severity}
                        onChange={(e) => {
                          const srty = (severity, e.target.value);
                          setSeverity(srty);
                        }}
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Major">Major</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Minor">Minor</MenuItem>
                        <MenuItem value="Show Stopper">Show Stopper</MenuItem>
                        <MenuItem value="Priority">Priority</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <th>
                    Comments<sup style={{ color: "red" }}>*</sup> :
                  </th>
                  <td>
                    <TextField
                      sx={{ m: 1, width: "45ch" }}
                      id="outlined-multiline-static"
                      multiline
                      disabled={access !== "false" ? true : false}
                      rows={3}
                      required
                      value={comments}
                      onChange={(e) => {
                        const com = (comments, e.target.value);
                        setComments(com);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    User Comments<sup style={{ color: "red" }}>*</sup> :
                  </th>
                  <td>
                    <TextField
                      sx={{ m: 1, width: "45ch" }}
                      id="outlined-multiline-static"
                      multiline
                      required
                      value={userComments}
                      disabled={access !== "false" ? false : true}
                      rows={3}
                      onChange={(e) => {
                        const com = (userComments, e.target.value);
                        setUserComments(com);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div id="btn">
              <Button type="submit" variant="outline-success" id="submitbtn">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const owners = [
  "Balaji",
  "Bharath",
  "Tamil",
  "Manoj",
  "Thanigachalam",
  "Lokesh",
];
