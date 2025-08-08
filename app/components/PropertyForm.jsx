const PropertyForm = ({ initValues, mode, onSubmit }) => {
  return (
    <>
      <form className="flex flex-col items-center justify-center gap-4">
        <label className="label">
          Title
          <input type="text" placeholder="My Awesome House" className="input" />
        </label>
        <label className="label">
          Address
          <input type="text" placeholder="123 Cupcake Ln." className="input" />
        </label>
        <label className="label">
          City
          <input type="text" placeholder="Los Angeles" className="input" />
        </label>
        <label className="label">
          State
          <input type="text" placeholder="CA" className="input" />
        </label>
      </form>
    </>
  );
};

export default PropertyForm;
