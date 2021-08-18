import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { useUser } from "../contexts/Auth";
import { Collections } from "../pages/Collections";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Record from "../pages/Record";
import Search from "../pages/Search";
import Subscribe from "../pages/Subscribe";
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
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/subscribe">
          <Subscribe />
        </Route>
        <Route path="/collections">
          <Collections />
        </Route>
        <Route path="/record">
          <Record />
        </Route>
        <Route path="/watch/:id">
          <Detail />
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
