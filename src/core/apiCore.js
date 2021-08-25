import { API } from "../config"; //spoj sa backend-om
import queryString from "query-string";
export const getProducts = (sortBy) => {
  //metoda za dohvat svih produkata prema tipu sortriranja te prikaz samo njih 6
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    //? query za sortiranje
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  //metoda za dohvat svih kategorija sa backend strane
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//dohvat podataka ali ovisno o filterima,saljemo filtere pa je zato POST
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${API}/products/by/search`, {
    //link za kreiranje
    //saljemo prema backendu zahtjev (request)
    method: "POST", //obavezno navest metodu
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      //ako je response uspijesan, odnosno ako je sve oke
      return response.json();
    })
    .catch((err) => {
      console.log(err); //ako se desio error ispisi ga
    });
};
export const list = (params) => {
  //dat ce nam sve produkte na osnovu parametara
  const query = queryString.stringify(params);
  console.log("query", query);
  //metoda za dohvat svih produkata prema tipu sortriranja te prikaz samo njih 6
  return fetch(`${API}/products/search?${query}`, {
    //? query za sortiranje
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  //metoda za dohvat produkta po id za prikaz na stranici za detalje po prozvodu
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (productId) => {
  //metoda za dohvat povezanih produkata (povezanost po kategoriji) sa odredenim produktom
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: createOrderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
