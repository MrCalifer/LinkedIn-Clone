import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    console.log("Getting user authentication....");
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<>
            {props.user && <Navigate to="/home" />}
            {!props.user && <Navigate to="/login" />}
          </>}/> */}
          <Route path="/" element={<Login user={props}/>} />
          <Route
            path="/home"
            element={
              <>
                <Home />
                <Header />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
