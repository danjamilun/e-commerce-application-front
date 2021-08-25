import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const { categories, category, search, results, searched } = data; //destrukturiranje da mozemo pristupat
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data }); //dohvati ostatak data i popuni categories sa novim data
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const searchData = () => {
    if (search) {
      //list je metoda za backend definirana u apiCore.js
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const searchSubmit = (e) => {
    //ova funkcija se zove u formi
    e.preventDefault();
    searchData();
  };
  //ispis broja dohvacenih podataka, ako su dohvaceni
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };
  //prikaz dohvacenih podataka mapiranjen rezultata po indeksu
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  //funkcija koja vraca drugu funkciju, dohvat trenutne vrijednosti te spremanje u name (search ili category)
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false }); //spremi trenutnu vrijendost u name, name moze biti search ili category
  };

  /**znaci imamo unutar forme sve unutar <span/> taga jer zelimo sve unutar istog reda, zatim radimo select dio
   * di ce se prikazat drop down dio za odabir kategorije te ispid imena svih kategorija i mogucnost odabira jedne,
   * te zatim imamo input za unos onoga sta zelimo nac te i select i input nakon odabire pokrece handleChange metodu
   * kojoj salju argument ono sta pritrazuju to jest salju ka query na backend te vracaju
   * rezultat i prikaz rezultata, klikom na botun Search se pokrice searchSubmit funkcija 
   */
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );
  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
