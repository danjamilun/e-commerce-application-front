import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index"; //nalazi se u index.js unutar auth, provjerava da li je korisnik autentificiran i vraca podatke o njemu

const AdminRoute = ({ component: Component, ...rest }) => (
  //componenta je vrste React Componenta, drugi argument je ostatak argumenata koji dolazu sa komponentom trazenon(...rest)
  <Route
    {...rest}
    render={(props) =>//provjera da li je korisnik autentificiran i da li je korisnik admin
      isAuthenticated() && isAuthenticated().user.role ===1 ? (
        <Component {...props} /> //ako je korisnik autentificiran i admin, izvrsit ce se komponenta sa argumentima
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);
export default AdminRoute;
