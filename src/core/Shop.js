import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  //state za filtriranje po kategorijama ili po cijenama, niz kategorija koje mogu biti odabrane za filtriranje
  //drugi niz za cijene
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const init = () => {
    getCategories().then((data) => {
      //zvanje metode getCategories za dohvat svih kategorija sa backend-a
      //te kada se dohvati iz responsa pogledaj jeli ispravno dohvaceno ili je error
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  //slanje skip,limit,newFilters na backend za dohvat podataka po searchu
  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data); //spremi dohvaceno sa backend-a poslje za prikaz
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]); //prikaz filteredResult podataka i novih dohvacenih
        //ovisno o tome koliki je skip, povecanje prikaza, novi dohvaceni su u data.data
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore()} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters); //da se svaki put pri ucitavanju defaultno postavljaju neki za prikaz
  }, []);

  const handleFilters = (filters, filterBy) => {
    //filters ce biti category id i price, filterBy => filterByPrice ili filterById
    const newFilters = { ...myFilters }; //kreiramo filter po kojem cemo filtrirati iz sate-a filters
    newFilters.filters[filterBy] = filters; //filters koji smo poslali kao props spremamo u newFilters u
    //u state myFilters te posto on ima objekt unutar sebe, moramo dohvatiti to u objektu
    //dohvacamo filters objekt i spremamo filterBy, filterBy moze biti price ili category, kako smo def u objektu

    if (filterBy === "price") {
      //ako je price filter udi u if
      let priceValues = handlePrice(filters); //vratit ce se array
      newFilters.filters[filterBy] = priceValues; //tipa dohvati array [0,9]
      //pristupamo myFilters.filters[price] i tu spremamo taj array, to je pristupamo price arrayu u myFilters
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters); //sve to izradeno spremamo sa set-om
  };
  const handlePrice = (value) => {
    //id kao value
    const data = prices;
    let array = []; //dohvacamo array od prices iz niza i spremamo u ovaj
    for (let key in data) {
      //clan po clan
      if (data[key]._id === parseInt(value)) {
        //ako je pronadena kliknuta vrijednost po usporedbi id-ova
        array = data[key].array; //dohvati niz od toga clana i spremi
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};
export default Shop;
