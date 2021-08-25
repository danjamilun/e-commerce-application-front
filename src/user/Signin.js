import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth"; //netriba dalje jer je index

const Signin = () => {
  //kada imamo vise unosa odnosno vise useState-ova onda koristimo objekt useState u kojeg sve stavljamo
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  //destrukturiranje podataka unutar values-a za lakse uzimanje podataka
  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  //arrow funkcija koja ce se pozivati kada se unese nesto u inpute doli navedene
  //kao argument prima name odnosno naziv onoga sta se unilo znaci name moze biti name,email ili password
  //doli u formi saljemo sta se salje pod nazivom odnosno kao arg. metode handleChange
  //ovo je event doli naveden jer se funkcija zove kada se desi event promjena
  const handleChange = (name) => (event) => {
    //znaci prvi argument u setValues je dohvat ostatka values elemenata, drugi error i treci trenutno unesena vrijednost koja se sprema u name

    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); //da se zaustavi reload-anje browsera kada se botun za spremanje klikne, jer to ne zelimo
    setValues({ ...values, error: false, loading: true }); //svaki put postavi error na false pa kad se refresh-a sve da se ne cuva stari error
    signin({ email, password }) //mozemo slat i bez viticastih zasebno, ili sa njima ali onda predstavlja jedan objekt koji sadrzi podatke
      .then((data) => {
        //nakon sta se posalju podaci o useru
        if (data.error) {
          //provjera da li je nasta error
          setValues({ ...values, error: data.error, loading: false });
        } else {
          /*nakon sta s uredno ucita, pozovi authenticate definiranu u auth/index.js
          koja kao prvi argument prima podatke koji su gore dobiveni,a drugi callback funkcija
          koja postavlja redirectToReferrer na true da se izvrsi redirekt na drugu stranicu*/
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      });
  };
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  //metoda za prikaz errora ako se desi
  /**display: error ? '' : 'none', znacenje display prikazi, ako se desi error prikazi error odnosno
   * bit ce viden, a ako nedesi onda napisi none   */
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  //metoda za prikaz uspijesnog kreiranja usera, odnosno racuna
  const showLoading = () =>
    loading && ( //ako je loading true
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  //metoda za redirekt na neku stranicu
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        //provjera koji je role iz usera
        return <Redirect to="/admin/dashboard" />; //ako je role 1 onda prosljedi na /admin/dashboard
      } else {
        return <Redirect to="/user/dashboard" />; //ako je role 0 onda prosljedi na /user/dashboard
      }
    }
    if (isAuthenticated()) {//ako logirani kao user obicni pokusa priko linka pristupit ka admin  /admin/dashboard
      return <Redirect to="/" />;//pribaci ga na home page
    }
  };

  //showError i showSuccess se navode prvo da se na vrhu stranice prikazuju errori ili poruka uspijesnosti
  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
      {/* za prikaz podataka koji se unosu na dnu */}
    </Layout>
  );
};

export default Signin;
