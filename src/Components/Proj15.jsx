import React, { useState, useEffect } from "react";
import "../assets/Css/ProductList.css";

function Proj15() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading products...</p>;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      ))}
    </div>
  );
}


export default Proj15;
