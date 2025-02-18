import React from "react";
import Modal from "./Modal";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import "../styles/FilterModal.css";

const FilterModal = ({
  isOpen,
  onClose,
  onFilterSelect,
  rangeValue,
  setRangeValue,
  MIN_BOUND,
  MAX_BOUND,
}) => {
  const handleSliderChange = (value) => {
    setRangeValue(value);
  };
  const handleApplyAmountFilter = () => {
    onFilterSelect({ Type: "amount", min: rangeValue[0], max: rangeValue[1] });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="filter-modal">
        <h2 className="filter-modal_title">Filter by amount</h2>
        <div className="solider-container">
          <div className="solider-values">
            <span>{rangeValue[0]}</span>-<span>{rangeValue[1]}</span>
          </div>
          <Slider
            range
            min={MIN_BOUND}
            max={MAX_BOUND}
            onChange={handleSliderChange}
            styles={{
              track: {
                backgroundColor: "#26415e",
                height: "4px",
                borderRadius: "4px",
                border: "none",
              },
              rail: {
                backgroundColor: "#d9d9d9",
                height: "4px",
                borderRadius: "4px",
                border: "none",
              },
              handle: {
                backgroundColor: "#0b1b32",
                border: "none",
                width: "16px",
                height: "16px",
                marginTop: "-6px",
              },
              tracks: {
                backgroundColor: "#26415e",
                height: "4px",
                borderRadius: "4px",
                border: "none",
              },
            }}
          />
          <div className="filter-modal-actions">
            <button className="filter-modal_cancel" onClick={() => onClose()}>
              Close
            </button>
            <button
              className="filter-modal_apply"
              onClick={handleApplyAmountFilter}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
