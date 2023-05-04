import Button from "react-bootstrap/Button";
import { useState } from "react";
import List from "./List";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./Home.css";
function Home({ currentPage, setCurrentPage, recordsPerPage }) {
  const navigate = useNavigate();
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [list, setList] = useState([
    {
      page: "About",
      type: "UI",
      description: "Issue in responsive",
      owner: "Balaji",
      severity: "Medium",
      comments: "Fix this issue",
      userComments: "",
    },
    {
      page: "Contact",
      type: "Functionality",
      description: "Issue in send button",
      owner: "Tamil",
      severity: "Major",
      comments: "Fix it",
      userComments: "",
    },
  ]);
  if (localStorage.getItem("details") === null) {
    localStorage.setItem("details", JSON.stringify(list));
  }
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("sorting");
    localStorage.removeItem("showDialog");
    navigate("/");
  };
  return (
    <div>
      <div id="container">
        <header>
          <nav className="NavbarItems">
            <h1 className="navbar-logo">
              <i className="fa fa-bug" aria-hidden="true"></i> Bug Ticket
            </h1>
            <div>
              <Link to="/form">
                <Button
                  variant="outline-primary"
                  id="createbtn"
                  hidden={access !== "false" ? true : false}
                >
                  Create
                  <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                </Button>
              </Link>
              <Tooltip title="Logout" onClick={logout}>
                <IconButton>
                  <LogoutRoundedIcon className="logout-icon"></LogoutRoundedIcon>
                </IconButton>
              </Tooltip>
            </div>
          </nav>
        </header>
        <section>
          <List
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            recordsPerPage={recordsPerPage}
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
