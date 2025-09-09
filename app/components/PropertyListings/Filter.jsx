import { useState, useCallback } from "react";

const Filter = ({ onFilter }) => {
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [minBathrooms, setMinBathrooms] = useState(0);
  const [minSquareFootage, setMinSquareFootage] = useState(0);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onFilter({
        minBedrooms: minBedrooms,
        minBathrooms: minBathrooms,
        minSquareFootage: minSquareFootage,
      });
    },
    [minBedrooms, minBathrooms, minSquareFootage, onFilter]
  );

  const handleReset = useCallback((e) => {
    e.preventDefault();
    setMinBedrooms(0);
    setMinBathrooms(0);
    setMinSquareFootage(0);
    onFilter({ minBedrooms: 0, minBathrooms: 0, minSquareFootage: 0 });
  });

  return (
    <div className="pb-4">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Min Bedrooms</legend>
          <select
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(Number(e.target.value))}
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
            onChange={(e) => setMinBathrooms(Number(e.target.value))}
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
            onChange={(e) => setMinSquareFootage(Number(e.target.value))}
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

        <fieldset className="fieldset">
          <legend className="fieldset-legend opacity-0">Actions</legend>
          <div className="flex items-center gap-2">
            <button type="submit" className="btn btn-primary btn-md">
              Filter Results
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-ghost btn-md"
            >
              Reset Filters
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Filter;
