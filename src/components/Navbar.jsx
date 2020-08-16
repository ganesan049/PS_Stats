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
        <Navbar.Text>
          <Nav className="mr-auto">
            <Nav.Link>
              <p>WELCOME {localStorage.getItem("user")} !!!</p>
            </Nav.Link>
            <Nav.Link>
              <Link to="/quiz">quiz</Link>
            </Nav.Link>
            <Nav.Link>
              <a
                className="btn btn-primary mt-0"
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
        </Navbar.Text>
      );
    } else {
      return (
        <Navbar.Text>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/signin">login</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Text>
      );
    }
  };
  return (
    <>
      <Navbar
        bg="light"
        expand="sm"
        className="justify-content-between align-item-center"
      >
        <Navbar.Brand href="#home">
          <Nav.Link>
            <Link to={state ? "/" : "/signin"} className="brand-logo left">
              PS TOURNAMENT
            </Link>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end align-item-center">
          {renderList()}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarFixed;
