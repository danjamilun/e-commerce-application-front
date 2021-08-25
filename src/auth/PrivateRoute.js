import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index"; //nalazi se u index.js unutar auth, provjerava da li je korisnik autentificiran i vraca podatke o njemu

const PrivateRoute = ({ component: Component, ...rest }) => (
  //componenta je vrste React Componenta, drugi argument je ostatak argumenata koji dolazu sa komponentom trazenon(...rest)
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} /> //ako je korisnik autentificiran, izvrsit ce se komponenta sa argumentima
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);
export default PrivateRoute;
