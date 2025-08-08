const EditProperty = ({ initValues, onSubmit }) => {
  return (
    <PropertyForm initValues={initValues} mode="edit" onSubmit={onSubmit} />
  );
};

export default EditProperty;
