import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth"; //netriba dalje jer je index
const Signup = () => {
  //kada imamo vise unosa odnosno vise useState-ova onda koristimo objekt useState u kojeg sve stavljamo
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  //destrukturiranje podataka unutar values-a za lakse uzimanje podataka
  const { name, email, password, success, error } = values;

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
    setValues({ ...values, error: false }); //svaki put postavi error na false pa kad se refresh-a sve da se ne cuva stari error
    signup({ name, email, password }) //mozemo slat i bez viticastih zasebno, ili sa njima ali onda predstavlja jedan objekt koji sadrzi podatke
      .then((data) => {
        //nakon sta se posalju podaci o useru
        if (data.error) {
          //provjera da li je nasta error
          setValues({ ...values, error: data.error, success: false });
        } else {
          //ako se nije desio error, nakon slanja postavi odnosno napravi refresh svega da se omoguci ponovni unos
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      });
  };
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

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
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );
  //showError i showSuccess se navode prvo da se na vrhu stranice prikazuju errori ili poruka uspijesnosti
  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {/* {JSON.stringify(values)} */}
      {/* za prikaz podataka koji se unosu na dnu */}
    </Layout>
  );
};

export default Signup;
