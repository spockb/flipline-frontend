import { useState } from "react";

const Filter = ({ onFilter }) => {
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [minBathrooms, setMinBathrooms] = useState(0);
  const [minSquareFootage, setMinSquareFootage] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ minBedrooms, minBathrooms, minSquareFootage });
  };

  return (
    <div className="pb-4">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Min Bedrooms</legend>
          <select
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
            className="select"
          >
            <option value={0}>No Min</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
            <option value={6}>6+</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Min Bathrooms</legend>
          <select
            value={minBathrooms}
            className="select"
            onChange={(e) => setMinBathrooms(e.target.value)}
          >
            <option value={0}>No Min</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Min Ft²</legend>
          <select
            value={minSquareFootage}
            className="select"
            onChange={(e) => setMinSquareFootage(e.target.value)}
          >
            <option value={0}>No Min</option>
            <option value={500}>500+</option>
            <option value={1000}>1000+</option>
            <option value={1500}>1500+</option>
            <option value={2000}>2000+</option>
            <option value={2500}>2500+</option>
            <option value={3000}>3000+</option>
          </select>
        </fieldset>

        <input
          type="submit"
          className="btn btn-primary"
          value="Filter Search"
        />
        <button type="reset" className="btn btn-sm btn-ghost">
          Reset Filters
        </button>
      </form>
    </div>
  );
};

export default Filter;
