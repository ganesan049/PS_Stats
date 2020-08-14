import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import {data} from "../data";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [res, setres] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0 && password.length > 0) {
      data.forEach((element) => {
        if (element.name.toUpperCase() === name.toUpperCase() && element.password === password) {
          let obj = { name, teamName: element.teamName.toUpperCase() };
          localStorage.setItem("user", name);
          localStorage.setItem("teamName", element.teamName);
          dispatch({ type: "USER", value: obj });
          history.push("/");
        }
      }
      );
    } else {
      setres("Please Enter all the field");
    }
    setres("Enter Correct Username or Password");
  };
  return (
    <div className="my-card">
      <div className="card auth-card">
        <h2 className="brand-logo">Sign In</h2>
        {res ? <p>{res}</p> : null}
        <input
          required
          type="text"
          className="input-field"
          placeholder="name"
          value={name}
          id="name"
          onChange={(e) => setname(e.target.value.toUpperCase())}
        />
        <input
          required
          type="password"
          className="input-field"
          value={password}
          placeholder="password"
          id="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <a
          className="waves-effect waves-light btn btn-primary"
          onClick={(e) => onSubmit(e)}
        >
          button
        </a>
      </div>
    </div>
  );
};

export default Login;
