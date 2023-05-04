import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export const Login = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const loginbtn = (e) => {
    e.preventDefault();
    if (username === "user" && password === "123") {
      localStorage.setItem("access", true);
      setCurrentPage(1);
      navigate("/home");
    } else if (username === "tester" && password === "456") {
      localStorage.setItem("access", false);
      setCurrentPage(1);
      navigate("/home");
    } else {
      setOpen(true);
    }
  };
  return (
    <div>
      <div className="login-form">
        <h1>LOGIN</h1>
        <form
          onSubmit={(e) => {
            loginbtn(e);
          }}
        >
          <div>
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              className="textfields"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              required
              className="textfields"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="links">
            <div>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Remember me</label>
            </div>
            <div>
              <a href="#" className="link">
                Forgot Password?
              </a>
            </div>
          </div> */}
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          <br></br>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"LOGIN CREDENTIALS?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Invalid Credentials!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
