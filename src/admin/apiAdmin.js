import { API } from "../config"; //spoj sa backend-om

//da bi kreirali kategoriju moramo biti admin, pa saljemo backend-u token, user id i category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    //saljemo prema backendu zahtjev (request)
    method: "POST", //obavezno navest metodu
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category), //saljemo kao json
  })
    .then((response) => {
      //ako je response uspijesan, odnosno ako je sve oke
      return response.json();
    })
    .catch((err) => {
      console.log(err); //ako se desio error ispisi ga
    });
};

//da bi kreirali kategoriju moramo biti admin, pa saljemo backend-u token, user id i category
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    //link za kreiranje
    //saljemo prema backendu zahtjev (request)
    method: "POST", //obavezno navest metodu
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product, //saljemo kao form data
  })
    .then((response) => {
      //ako je response uspijesan, odnosno ako je sve oke
      return response.json();
    })
    .catch((err) => {
      console.log(err); //ako se desio error ispisi ga
    });
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

export const listOrders = (userId, token) => {
  //metoda za dohvat svih narudzbi sa backend strane
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
  //metoda za dohvat svih statusa sa backend strane za narudzbe
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, orderId })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};
