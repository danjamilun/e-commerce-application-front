import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destrukturiranje usera i tokena iz localStorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    //e=>event
    setError("");
    setName(e.target.value); //postavi ime koje sm spremili u value
  };
  const clickSubmit = (e) => {
    //e=>event
    e.preventDefault(); //da se page ne reloada
    setError("");
    setSuccess(false); //poslje nakon dohvata cemo prominiti na true
    //make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        //ako se desi greska
        setError(true);
      } else {
        //ako je sve oke
        setError(""); //empty
        setSuccess(true); //uspijesno postavljeno
      }
    });
  };
  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name} //ime koje dohvatis spremi u value
          autoFocus
          required //obavezan unos
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    //ako je kategorija kreirana prikazat cemo to
    if (success) {
      //ako je success true
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    //ako se desio error prikazat cemo to
    if (error) {
      //ako je error
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    //povratak nazat nakon kreiranja kategorije
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add a new category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
