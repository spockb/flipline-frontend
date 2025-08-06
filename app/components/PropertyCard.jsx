import Badge from "./Badge";

export default function PropertyCard({ id }) {
  return (
    <div key={id} className="flex flex-col">
      <div className="size-80">
        <img src="/images/house01.webp" alt="house" />
      </div>
      <div className="flex">
        <p>Los Angeles, CA</p>
        <p>$250,000</p>
      </div>
      <p>1247 Oak Valley Drive</p>
      <div className="flex gap-2">
        <Badge type="bed">3</Badge>
        <Badge type="bath">2</Badge>
        <Badge type="sqf">1500</Badge>
      </div>
    </div>
  );
}
