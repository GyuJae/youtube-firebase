import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { useUser } from "../contexts/Auth";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";
import Header from "./Header";
import Side from "./Side";

const AppRouter = () => {
  const user = useUser();
  return (
    <HashRouter>
      <Header />
      <Side />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {user && (
          <>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
          </>
        )}
      </Switch>
    </HashRouter>
  );
};

export default AppRouter;
