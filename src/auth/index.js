import { API } from "../config";

//metoda za backend dio za slanje podataka za kreiranje usera, kreiranje racuna
export const signup = (user) => {
  //metoda za slanje podataka na backend
  //koristimo fetch za slanje podataka na backend, prvi argument je url od backenda(api/signup)
  //odnosno radi se request za ovu rutu, a drugi argument je objekt
  return fetch(`${API}/signup`, {
    method: "POST", //obavezno navest metodu
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), //saljemo kao json
  })
    .then((response) => {
      //ako je response uspijesan, odnosno ako je sve oke
      return response.json();
    })
    .catch((err) => {
      console.log(err); //ako se desio error ispisi ga
    });
};

//metoda za backend dio za slanje podataka za logiranje odnosno za signin
export const signin = (user) => {
  //metoda za slanje podataka na backend
  //koristimo fetch za slanje podataka na backend, prvi argument je url od backenda(api/signup)
  //odnosno radi se request za ovu rutu, a drugi argument je objekt
  return fetch(`${API}/signin`, {
    method: "POST", //obavezno navest metodu
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), //saljemo kao json
  })
    .then((response) => {
      //ako je response uspijesan, odnosno ako je sve oke
      return response.json();
    })
    .catch((err) => {
      console.log(err); //ako se desio error ispisi ga
    });
};
//spremanje podataka u local storage
export const authenticate = (data, next) => {
  //ovo next je vamo callback funkcija, vidi u Signin.js
  //ako imamo window objekt
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data)); //za postavljanje na local storage koristimo metodu setItem
    //postavi(spremi) pod nazivom jwt(u local storage) podatke koje smo naveli kao drugi argument, a prije toga ih pretvori u JSON string
    next();
  }
};

//signout
export const signout = (next) => {
  //ovo next je callback funkcija
  //provjera imamo li local storage
  if (typeof window !== "undefined") {
    //uklanjanje json web tokena iz local storage-a iz browsera
    localStorage.removeItem("jwt");
    next();
    //request za backend tako da vidimo da je user logout
    return fetch(`${API}/signout`, {
      //url prvi argument (url za backend)
      method: "GET",
    })
      .then((response) => {
        //ako dobijemo response
        console.log("signout", response);
      }) //ako dobijemo error
      .catch((err) => console.log(err));
  }
};
//metoda koja cce nam sluzit da bi vidjeli je li user logiran ako je makni ikone signin,sigup, a ostavi samo sigout...
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    //ako mozemo pristupiti local storage-u, dohvati jwt
    return JSON.parse(localStorage.getItem("jwt")); //vrati kao json string, parse pretvara u json string
  } else {
    return false;
  }
};
