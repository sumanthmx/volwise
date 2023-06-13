import React, { useState } from 'react';

function Dropdown({ onOptionSelect, lookBack }) {

  const handleOptionChange = (event) => {
    onOptionSelect(event.target.value); // Pass the selected option to the parent component
  };

  return (
    <div className="dropdown">
      <select value={lookBack} onChange={handleOptionChange}>
        <option value = {lookBack}>Select a Lookback</option>
        <option value="none">none</option>
        <option value="1d">1d</option>
        <option value="2d">2d</option>
        <option value="3d">3d</option>
        <option value="1w">1w</option>
      </select>
      {lookBack && <p>Selected Lookback: {lookBack}</p>}
    </div>
  );
}

export default Dropdown;
