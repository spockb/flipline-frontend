import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import Badge from "../components/Badge";
import { useAuth } from "../auth-context";
import { useFavorites } from "../fav-context";
import {
  MdStarBorder,
  MdStar,
  MdShare,
  MdEdit,
  MdDelete,
} from "react-icons/md";

const PropertyDetails = ({
  allProperties,
  setAllProperties,
  property,
  setProperty,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [deleteMessage, setDeleteMessage] = useState(false);
  const { user } = useAuth();
  const { has, toggle } = useFavorites();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const force = search.has("r");

    if (!force && Array.isArray(allProperties)) {
      const local = allProperties.find(
        (item) => String(item.id) === String(params.id)
      );
      if (local) {
        setProperty(local);
        return;
      }
    }

    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
          }/api/properties/${params.id}`,
          { credentials: "include", cache: "no-store", signal: ctrl.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch property details:", err);
        }
      }
    })();

    return () => ctrl.abort();
  }, [params.id, location.search, allProperties]);

  function formatNum(val) {
    return (val ?? 0).toLocaleString("en-US");
  }

  const deleteProperty = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
        }/api/properties/${params.id}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
          credentials: "include",
        }
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

  const fullAddress = useMemo(
    () => [address, city, state].filter(Boolean).join(", "),
    [address, city, state]
  );

  const pricePerSqft = useMemo(() => {
    if (!cost || !squareFootage) return null;
    return Math.round(cost / squareFootage);
  }, [cost, squareFootage]);

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  const FavoriteButton = () => {
    const isFavorited = has?.(id);
    return (
      <button
        onClick={() => toggle?.(id)}
        className={`btn btn-soft btn-sm ${isFavorited ? "btn-primary" : ""}`}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorited ? (
          <MdStar size="1.2rem" />
        ) : (
          <MdStarBorder size="1.2rem" />
        )}
        <span className="ml-1"> {isFavorited ? "Favorited" : "Favorite"} </span>
      </button>
    );
  };

  const ShareButton = () => (
    <button
      className="btn btn-soft btn-sm"
      onClick={onShare}
      title="Copy link"
      aria-label="Share"
    >
      <MdShare size="1.2rem" />
      <span className="ml-1">{copied ? "Link copied!" : "Share"}</span>
    </button>
  );

  const KeyFact = ({ label, value }) => (
    <div className="p-3 rounded-lg bg-base-200">
      <div className="text-xs opacity-70">{label}</div>
      <div className="font-semibold">{value ?? "-"}</div>
    </div>
  );

  const DeleteElement = () => {
    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-base-300/60"
          onClick={() => setDeleteMessage(false)}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center">
                Are you sure you want to delete this property?
              </h2>
              <p className="text-center">This action cannot be undone.</p>
              <div className="justify-center card-actions mt-2">
                <button
                  className="btn btn-soft btn-sm"
                  onClick={() => setDeleteMessage(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={deleteProperty}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const LoadingSkeleton = () => (
    <div className="max-w-6xl px-4 mx-auto my-10 animate-pulse">
      <div className="w-full h-[300px] rounded-xl bg-base-200 mb-6" />
      <div className="h-6 w-2/3 bg-base-200 rounded mb-2" />
      <div className="h-4 w-1/3 bg-base-200 rounded mb-6" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-base-200 rounded" />
        ))}
      </div>
      <div className="h-24 bg-base-200 rounded" />
    </div>
  );

  const AdminControls = () => {
    const isAdmin = user?.role === "ADMIN";

    if (!isAdmin) return null;

    return (
      <div className="relative">
        {deleteMessage ? <DeleteElement /> : null}
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-soft btn-sm"
            onClick={() => navigate(`/admin/properties/${params.id}/edit`)}
          >
            <MdEdit size="1.2rem" />
            <span className="ml-1">Edit</span>
          </button>
          <button
            className="btn btn-soft btn-error btn-sm"
            onClick={() => {
              setDeleteMessage(true);
            }}
          >
            <MdDelete size="1.2rem" />
            <span className="ml-1">Delete</span>
          </button>
        </div>
      </div>
    );
  };

  if (!id) return <LoadingSkeleton />;

  return (
    <>
      <div className="max-w-6xl px-4 mx-auto my-10">
        {/* Top row: breadcrumb/title + actions */}
        <div className="flex flex-col items-start justify-between gap-3 mb-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="link link-hover">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <Link to="/properties" className="link link-hover">
              Properties
            </Link>
            <span className="opacity-40">/</span>
            <span className="truncate max-w-[50vw]" title={fullAddress}>
              {address}
            </span>
          </div>
          <div className="flex gap-2">
            <ShareButton />
            <FavoriteButton />
            <AdminControls />
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[420px] rounded-xl mb-6 bg-base-200">
          <img
            src={images?.[0]}
            alt={`Exterior view of ${fullAddress}`}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Header: Address + price */}
        <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-base-content">{address}</h1>
            <p className="text-lg text-neutral">
              {city}, {state}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-primary">
              ${formatNum(cost)}
            </div>
            <div className="text-sm text-neutral">
              Valued at{" "}
              <span className="text-base-content font-medium">
                ${formatNum(valuedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions + facts */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Badge type="bed">{bedrooms} Bed</Badge>
              <Badge type="bath">{bathrooms} Bath</Badge>
              <Badge type="sqf">{formatNum(squareFootage)}ft²</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                className="btn btn-primary btn-sm"
                href={`mailto:sales@example.com?subject=Inquiry: ${encodeURIComponent(
                  fullAddress
                )}&body=I'm interested in ${encodeURIComponent(
                  fullAddress
                )} (${id}).`}
              >
                Contact agent
              </a>
              <a
                className="btn btn-soft btn-sm"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  fullAddress
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                View on map
              </a>
            </div>

            {/* Description */}
            <div className="mb-2">
              <h2 className="mb-2 text-xl font-semibold text-base-content">
                About this property
              </h2>
              <p className="leading-relaxed text-base-content whitespace-pre-line">
                {bio}
              </p>
            </div>

            {/* Gallery (if more images) */}
            {images?.length > 1 && (
              <div>
                <h3 className="mb-2 font-semibold">Gallery</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-48 overflow-hidden rounded-lg"
                    >
                      <img
                        src={img}
                        alt={`Photo ${idx + 2} of ${fullAddress}`}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="p-4 rounded-lg bg-base-100 border border-base-200">
            <h3 className="mb-3 font-semibold">Key facts</h3>
            <div className="grid grid-cols-2 gap-3">
              {lotSize ? (
                <KeyFact label="Lot size" value={`${lotSize} acres`} />
              ) : null}
              {yearBuilt ? (
                <KeyFact label="Year built" value={yearBuilt} />
              ) : null}
              {pricePerSqft ? (
                <KeyFact
                  label="Price / ft²"
                  value={`$${formatNum(pricePerSqft)}`}
                />
              ) : null}
              <KeyFact label="Property ID" value={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
