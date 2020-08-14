import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import NavbarFixed from "./components/Navbar";
import GoogleSheet from "./components/GoogleSheet";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import "./App.css";
import quizReducer from "./reducers/Reducer";
export const UserContext = createContext();

function App() {
  const initialState = {
    user: {},
    questions: [],
    currentQuestion: 0,
    currentAnswer: "",
    answers: [],
    error: "",
    showResults: false,
    challenge:0
  };
  const [state, dispatch] = useReducer(quizReducer, initialState);
  useEffect(() => {
  }, [state])
  console.log(state, dispatch)
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <NavbarFixed />
          <Switch>
            <Route exact path="/" component={GoogleSheet} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/quiz" component={Quiz} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
