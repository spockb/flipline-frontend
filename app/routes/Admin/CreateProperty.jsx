import PropertyForm from "../../components/PropertyForm";

const CreateProperty = ({ onSubmit }) => {
  return <PropertyForm mode="create" onSubmit={onSubmit} />;
};

export default CreateProperty;
