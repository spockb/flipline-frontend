import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const params = useParams();

  return <div>Listing {params.id} Details</div>;
}
