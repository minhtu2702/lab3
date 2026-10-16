function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination">
      <button className="btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Trước
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === currentPage ? "btn" : "btn outline"}
          disabled={p === currentPage}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button className="btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Sau
      </button>
    </div>
  );
}

export default Pagination;
