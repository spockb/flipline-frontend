import { useState } from "react";

const Filter = ({ onFilter }) => {
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [minBathrooms, setMinBathrooms] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ minBedrooms, minBathrooms });
  };

  return (
    <div className="">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Min Bedrooms</legend>
          <select
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(Number(e.target.value))}
            className="select"
          >
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Min Bathrooms</legend>
          <select
            value={minBathrooms}
            className="select"
            onChange={(e) => setMinBathrooms(Number(e.target.value))}
          >
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </fieldset>

        <input
          type="submit"
          className="text-white btn bg-primary-500"
          value="Filter Search"
        />
      </form>
    </div>
  );
};

export default Filter;
