import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  totalItems,
  totalPages,
}) => {
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
        <p className="join-item btn pointer-events-none">
          {currentPage} of {totalPages}
        </p>
        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
