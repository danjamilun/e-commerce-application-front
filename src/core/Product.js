import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  //ucitavanje podataka za pojedinog produkta, zove se read metoda koja je definirana u apiCore za backend
  const loadSingleProduct = (productId) => {
    //salje joj se id od produkta
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related product--> nakon dohvata podataka zovi funkciju listRelated za dohvat slicnih proizvoda po
        //kategoriji
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId; //ovako dohvacamo product id iz url, tj bilo sta iz url-a(props.match.params)
    loadSingleProduct(productId);
  }, [props]); //kada se promini id gori u url, triba napravit update propsa i dohvata

  //substring-duljina nekog opisa, stringa, u ovom slucaju od 0 do 100(znaci maksimum je 100)
  //product && product.name - prvo je provjera da li postoji product i ako je dohvati product name
  //drugo je postoji li product i ako je dohvati product.descpription ali odredene duljine (100 je duljina)
  //doli unutar div-a provjeravamo postoji li product, postoji li product.description i ako postoji zovi Card komponentu
  //ako saljemo u Card showViewProductButton kao false nece se prikazati botun za prikaz detalja
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Product;
