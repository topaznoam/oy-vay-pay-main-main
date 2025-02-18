import React, { useState } from "react";
import "../styles/Filters.css";
import { SlidersHorizontal } from "lucide-react";
import FilterModal from "./FilterModal";

const Filters = ({
  inputSearch,
  setInputSearch,
  selectedFilter,
  setSelectedFilter,
}) => {
  const MIN_BOUND = 0;
  const MAX_BOUND = 1000;
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState([MIN_BOUND, MAX_BOUND]);

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
    setIsFilterModalOpen(false);
  };

  const handleClearFilter = () => {
    setSelectedFilter(null);
    setRangeValue([MIN_BOUND, MAX_BOUND]);
  };
  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="search..."
          value={inputSearch}
          onChange={({ target }) => setInputSearch(target.value)}
        ></input>
        <button onClick={() => setIsFilterModalOpen(true)}>
          <SlidersHorizontal />
        </button>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilterSelect={handleFilterSelect}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
        MIN_BOUND={MIN_BOUND}
        MAX_BOUND={MAX_BOUND}
      />
    </>
  );
};

export default Filters;
