import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  //useState objekt, postavljanje defaultnih vrijednosti koje ćemo popunjavati
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: "",
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  //destrukturiranje iz state-a odnosno iz values-a podatke za lakse koristenje
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  //load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      //zvanje metode getCategories za dohvat svih kategorija sa backend-a
      //te kada se dohvati iz responsa pogledaj jeli ispravno dohvaceno ili je error
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() }); //spremi dohvaceno i izradi novu formu
      }
    });
  };
  //svaki put kad se promini nesto u values rendera se automatski sa useEffect, tj update-a se dio u values automatski
  useEffect(() => {
    /*i kreira se form data koji ce se popunit i kao takav slat backend-u
        jer se backendu salje kao form data ne kao json format */
    init();
  }, []);
  //dvi arrow funkcije, funkcija koja vraca drugu funkciju
  const handleChange = (name) => (event) => {
    /*ako je name jednako photo onda ucitaj iz event target files prvi element niza odnosno
    prvo ucitano, a ako nije onda uzmi event target value te ovisno sta je spremi u value */
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value); //popuni form data sa vrijednosti za odredeni name
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        //ako imamo error
        setValues({ ...values, error: data.error });
      } else {
        //ako je sve ispravno, isprazni sve za novi unos
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          quantity: "",
          photo: "",
          loading: false,
          error: "",
          createdProduct: data.name,
        });
      }
    });
  };
  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          ></input>
        </label>
      </div>

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
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    //prikaz ispisa greske ako se desila pri kreiranju producta
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    //prikaz ispisa uspijeha ako je sve oke napravljeno
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );
  const showLoading = () =>
    //prikaz ispisa uspijeha ako je sve oke napravljeno
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to add a new product`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
