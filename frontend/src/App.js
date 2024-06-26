import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Popular, Generate, Random, Collection, New, Scheme } from "./components";
import { Login, Profile, Register } from "./Auth";

function App() {
  return (
    <>
      <React.Fragment>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/"
            element={<div>
              <Layout />
              <div className="window">
                <Popular />
              </div>
            </div>}
          />
          <Route
            path="/new"
            element={<div>
              <Layout />
              <div className="window">
                <New />
              </div>
            </div>}
          />
          <Route
            path="/generate"
            element={<div>
              <Layout />
              <div className="window">
                <Generate />
              </div>
            </div>}
          />
          <Route
            path="/random"
            element={<div>
              <Layout />
              <div className="window">
                <Random />
              </div>
            </div>}
          />
          <Route
            path="/scheme"
            element={<div>
              <Layout />
              <div className="window">
                <Scheme />
              </div>
            </div>}
          />
          <Route
            path="/collection"
            element={<div>
              <Layout />
              <div className="window">
                <Collection />
              </div>
            </div>}
          />
        </Routes>
      </React.Fragment>
    </>
  );
}

export default App;
