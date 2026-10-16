import { useState, useEffect } from "react";

// Dùng useState quản lý ô nhập; chỉ cập nhật URL khi submit form
function SearchBar({ keyword, onSearch }) {
  const [text, setText] = useState(keyword);

  // Đồng bộ lại ô nhập khi keyword trên URL thay đổi (back/forward, link...)
  useEffect(() => {
    setText(keyword);
  }, [keyword]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tìm tên sản phẩm..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn">Tìm</button>
    </form>
  );
}

export default SearchBar;
