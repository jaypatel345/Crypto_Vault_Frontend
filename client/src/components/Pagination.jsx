import React from "react";
import "../css/Pagination.css"; // Optional: if you keep the CSS separate
const Pagination = ({ page, onPrev, onNext, disablePrev, disableNext }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "32px" }}>
      <button
        className="pagination-button"
        onClick={onPrev}
        disabled={disablePrev}
      >
        &#8592; {/* Left Arrow */}
      </button>
      <span style={{ margin: "0 12px", fontWeight: "bold" }}>{page}</span>
      <button
        className="pagination-button"
        onClick={onNext}
        disabled={disableNext}
      >
        &#8594; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default Pagination;