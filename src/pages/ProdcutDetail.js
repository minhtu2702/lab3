import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../datas/products";

function ProdcutDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <Link to="/products"> &larr; Back to Product List</Link>
    </div>
  );
}

export default ProdcutDetail;
