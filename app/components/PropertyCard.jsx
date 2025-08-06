import Badge from "./Badge";

export default function PropertyCard({ id }) {
  return (
    <div key={id}>
      <img src="public/images/house01.webp" alt="house" />
      <div>
        <p>Los Angeles, CA</p>
        <p>$250,000</p>
      </div>
      <p>1247 Oak Valley Drive</p>
      <div>
        <Badge />
        <Badge />
        <Badge />
      </div>
    </div>
  );
}
