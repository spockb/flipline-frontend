import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  totalItems,
}) => {
  let pages = [];
  for (let i = 1; i <= totalItems / itemsPerPage; i++) {
    pages.push(Math.ceil(i));
  }
  return (
    <div className="py-4 flex justify-center">
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="join-item btn pointer-events-none">{currentPage}</p>
        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
