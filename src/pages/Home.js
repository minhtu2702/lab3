import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #ccc", padding: "10px", borderTop: "3px solid #ccc" }}>
        <Link to="/" >Product Store</Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav >
      <h1 style={{ display: "flex", justifyContent: "center", padding: "10px" }}>Welcome to ProductStore</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>Manage and explore products for your needs.</div>
      <div style={{ textAlign: 'center' }}>
        <button style={{}}>
          <Link to="/products">View products</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
