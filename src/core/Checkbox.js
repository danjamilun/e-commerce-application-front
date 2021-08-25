import React, { useState, useEffect } from "react";

//saljemo u checkbox props => categories
const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  //funkcija koja vraca neku drugu funkciju, high arrow function
  const handleToggle = (c) => () => {
    //pokrene se ova funkcija, pri svakoj promjeni u inputu doli u returnu
    //te ovisno o c => kategoriji, odnosno o poslanom category id-u
    //prvo provjeravamo da li je kategorija u checked
    const currentCategoryId = checked.indexOf(c); //-1 ce vratit ako ne nade element
    const newCheckedCategoryId = [...checked]; //svi category id u use state checked
    //if currently checked was not already in checked state > push
    //else pull/take off
    if (currentCategoryId === -1) {
      //ako nepostoji dodaj
      newCheckedCategoryId.push(c); //push dodaje
    } else {
      //ako postoji makni
      newCheckedCategoryId.splice(currentCategoryId, 1); //splice mice
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId); //refreshaj, ponovno postavi stanje da se vidi sta je checkirano
    handleFilters(newCheckedCategoryId)
  };
  return categories.map((c, i) => (
    // c => categorie, i => index
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
