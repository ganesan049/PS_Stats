import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { Navbar, Nav } from "react-bootstrap";

const NavbarFixed = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  console.log(state);
  const renderList = () => {
    if (localStorage.getItem("user") && localStorage.getItem("teamName")) {
      if (!state.user.name) {
        dispatch({
          type: "USER",
          value: {
            name: localStorage.getItem("user"),
            teamName: localStorage.getItem("teamName"),
          },
        });
      }
      return (
        <Nav>
          <Nav.Link>
            <Link to="/quiz">quiz</Link>
          </Nav.Link>
          <Nav.Link>
            <a
              className="waves-effect waves-light btn btn-primary"
              onClick={(e) => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/");
              }}
            >
              logout
            </a>
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link>
            <Link to="/signin">login</Link>
          </Nav.Link>
        </Nav>
      );
    }
  };
  return (
    <>
      <Navbar bg="light" expand="sm" className="justify-content-between align-item-center">
        <Navbar.Brand href="#home">
          <Nav.Link>
            <Link to={state ? "/" : "/signin"} className="brand-logo left">
              PS TOURNAMENT
            </Link>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {renderList()}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarFixed;
