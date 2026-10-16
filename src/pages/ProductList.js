import React from "react";
import { products } from "../datas/products";
import { Link, useSearchParams } from "react-router-dom";
import CategoryFilter from "../pages/CategoryFilter";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywords = searchParams.get("keywords") || "";
  const category = searchParams.get("category") || "Tất cả danh mục";
  const sort = searchParams.get("sort") || "none";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 4;

  // Lọc theo keywords và category
  const filteredProducts = products.filter((product) => {
    const matchesKeyword = product.name.toLowerCase().includes(keywords.toLowerCase());
    const matchesCategory = category === "Tất cả danh mục" || product.category === category;
    return matchesKeyword && matchesCategory;
  });

  // Sắp xếp theo giá
  const sortedProducts = [...filteredProducts];
  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Tính tổng số trang
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const displayProducts = sortedProducts.slice(
    startIndex,
    startIndex + pageSize,
  );

  // Hàm cập nhật các tham số thay đổi của URL
  function updateParams(changes) {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null || value === "none" || value === "Tất cả danh mục") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });
    setSearchParams(nextParams);
  }

  function goToPage(newPage) {
    updateParams({ page: newPage });
  }

  function handleKeywordChange(event) {
    updateParams({
      keywords: event.target.value,
      page: 1,
    });
  }

  // Hàm thay đổi category truyền vào Filter component
  function handleCategoryChange(newCategory) {
    updateParams({
      category: newCategory,
      page: 1, // Reset về trang 1 khi đổi danh mục
    });
  }

  function handleSortChange(event) {
    updateParams({
      sort: event.target.value,
      page: 1,
    });
  }
  const handleCategory = (value) => updateParams({ category: value, page: 1 });
  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #ccc", padding: "10px", borderTop: "3px solid #ccc" }}>
        <Link to="/" >Product Store</Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav >
      
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
        <label>
          <input
            type="text"
            value={keywords}
            placeholder="Tìm tên sản phẩm . . . . . . . "
            onChange={handleKeywordChange}
          />
        </label>
        <CategoryFilter category={category} value={category} onChange={handleCategory} />
        <label>
          Sắp xếp:{" "}
          <select value={sort} onChange={handleSortChange}>
            <option value="none">Mặc định</option>
            <option value="price-asc">SX tăng dần</option>
            <option value="price-desc">SX giảm dần</option>
          </select>
        </label>
      </div>

      Sort: <strong>{sort}</strong> | Category: <strong>{category}</strong>

      {displayProducts.length === 0 ? (
        <p>Không tìm thấy sản phẩm</p>
      ) : (
        <ul>
          {displayProducts.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>phân loại: {product.category}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Giao diện phân trang */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          previous
        </button>{" "}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              disabled={pageNumber === currentPage}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}{" "}
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          next
        </button>
      </div>
      <p>
        Trang {currentPage}/{totalPages}
      </p>
    </div>
  );
}

export default ProductList;