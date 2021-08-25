import React from "react";
import Menu from "./Menu";
import "../style.css";//ovako je ucitano u cijelu aplikaciju, dostupno za cijelu aplikaciju
const Layout = ({
  //prima ove argumente, a ako nisu navedeni postavi im defaultne vrijednosti doli nevedene, Title, description..
  title = "Title",
  description = "Description",
  className, // svaka ce stranica imat svoju classname odnosno svoj stil, pa saljemo i to kao argument
  children, //kontent
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
