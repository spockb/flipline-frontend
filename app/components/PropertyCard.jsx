import Badge from "./Badge";

export default function PropertyCard({
  id,
  img,
  location,
  cost,
  address,
  bed,
  bath,
  sqf,
}) {
  function formatPrice(cost) {
    return Number(cost).toLocaleString("en-US");
  }

  return (
    <div
      key={id}
      className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <div className="w-full overflow-hidden h-60">
        <img
          src={img}
          alt="house"
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">{location}</p>
          <p className="text-xl font-bold text-green-600">
            ${formatPrice(cost)}
          </p>
        </div>

        <h3 className="mb-4 text-lg font-semibold leading-tight text-gray-900">
          {address}
        </h3>

        <div className="flex gap-3">
          <Badge type="bed">{bed}</Badge>
          <Badge type="bath">{bath}</Badge>
          <Badge type="sqf">{formatPrice(sqf)}</Badge>
        </div>
      </div>
    </div>
  );
}
