import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);//filter po trenutnoj vrijednosti, trenutno izabrani price
    setValue(event.target.value);//postavi trenutno izabrani price, odnosno rang
  };
  return prices.map((p, i) => (
    // c => categorie, i => index
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
