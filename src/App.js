import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { Form } from "./components/Form";
import { useState } from "react";
import "./App.css";
// import { Pagination } from "./components/Pagination";
function App() {
  // User is currently on this page
  const [details, setDetails] = useState(
    JSON.parse(localStorage?.getItem("details"))
  );
  // console.log(details);
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(3);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Login currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
        ></Route>
        <Route
          path="/home"
          element={
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              recordsPerPage={recordsPerPage}
            />
          }
        ></Route>

        <Route
          path="/form"
          element={
            <Form currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
