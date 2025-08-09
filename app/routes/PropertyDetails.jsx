import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Badge from "../components/Badge";

export default function PropertyDetails({
  allProperties,
  setAllProperties,
  property,
  setProperty,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const [deleteMessage, setDeleteMessage] = useState(false);

  useEffect(() => {
    const [propertyInfo] = allProperties.filter((item) => {
      if (item.id == params.id) return item;
    });
    if (propertyInfo) {
      setProperty(propertyInfo);
    } else {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://127.0.0.1:5000/api/properties/${params.id}`
          );
          const data = await res.json();
          setProperty(data);
        } catch (err) {
          console.error("Failed to fetch property details:", err);
        }
      };
      fetchData();
    }
  }, [params.id]);

  function formatNum(val) {
    return (val ?? 0).toLocaleString("en-US");
  }

  const deleteProperty = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/properties/${params.id}`,
        { method: "DELETE", headers: { Accept: "application/json" } }
      );

      if (res.ok) {
        const data = await res.json();
        setAllProperties((prev) =>
          prev.filter((p) => p.id !== data.property.id)
        );
        navigate("/properties");
        return;
      }
      const msg = await res.text();
      throw new Error(`Delete failed: ${res.status} ${msg}`);
    } catch (err) {
      console.error("Failed to delete property from database:", err);
    }
  };

  const {
    id,
    address,
    city,
    state,
    images,
    yearBuilt,
    cost,
    squareFootage,
    bedrooms,
    bathrooms,
    valuedAt,
    bio,
    lotSize,
  } = property;

  const DeleteElement = () => {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 shadow-sm top-1/2 left-1/2 card card-lg bg-base-100">
        <div className="text-center card-body">
          <h2 className="card-title">
            Are you sure you want to delete this property?
          </h2>
          <p>This action cannot be undone.</p>
          <div className="justify-center card-actions">
            <button
              className="btn btn-soft btn-sm"
              onClick={() => {
                setDeleteMessage(false);
              }}
            >
              Cancel
            </button>
            <button className="btn btn-error btn-sm" onClick={deleteProperty}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        {deleteMessage ? <DeleteElement /> : null}
        <div className="flex justify-end gap-4">
          <button
            className="btn btn-soft btn-sm"
            onClick={() => navigate(`/admin/properties/${params.id}/edit`)}
          >
            Edit
          </button>
          <button
            className="btn btn-soft btn-error btn-sm"
            onClick={() => {
              setDeleteMessage(true);
            }}
          >
            Delete
          </button>
        </div>

        <div className="max-w-6xl px-4 mx-auto my-10">
          {/* Hero Image */}
          <div className="w-full h-[400px] overflow-hidden rounded-xl mb-8">
            <img
              src={images?.[0]}
              alt={`Property at ${address}`}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Address and Location */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-base-content">{address}</h1>
            <p className="text-lg text-neutral">
              {city}, {state}
            </p>
          </div>

          {/* Price and Valuation */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <p className="text-2xl font-bold text-primary">
              ${formatNum(cost)}
            </p>
            <p className="text-md text-neutral">
              Valued at:{" "}
              <span className="font-medium text-base-content">
                ${formatNum(valuedAt)}
              </span>
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge type="bed">{bedrooms} Bed</Badge>
            <Badge type="bath">{bathrooms} Bath</Badge>
            <Badge type="sqf">{formatNum(squareFootage)}ft²</Badge>
            {lotSize && <Badge type="lot">{lotSize} acres</Badge>}
            {yearBuilt && <Badge type="year">Built {yearBuilt}</Badge>}
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="mb-2 text-xl font-semibold text-base-content">
              About this property
            </h2>
            <p className="leading-relaxed text-base-content">{bio}</p>
          </div>

          {/* Gallery (if more images) */}
          {images?.length > 1 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-48 overflow-hidden rounded-lg"
                >
                  <img
                    src={img}
                    alt={`Property image ${idx + 2}`}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
