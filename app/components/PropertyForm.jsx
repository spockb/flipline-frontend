import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyForm = ({ initValues, mode }) => {
  const def = initValues ?? { images: [] };
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(def);

  const params = useParams();

  async function presign(file) {
    const ext = file.name.split(".").pop();
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || ""}/api/uploads/presign`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type, ext }),
      }
    );
    if (!res.ok) {
      const err = await res.text().catch(() => "");
      throw new Error(`Presign failed (${res.status}) ${err}`);
    }
    return res.json();
  }

  async function uploadToR2(file) {
    const { url, publicUrl } = await presign(file);
    const put = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!put.ok) throw new Error(`Upload failed (${put.status})`);
    return publicUrl;
  }

  const createProperty = async (payload) => {
    const id = params.id;
    const base = `${import.meta.env.VITE_API_URL || ""}/api/properties`;
    const url = mode === "create" ? base : `${base}/${id}`;
    const fetchMethod = mode === "create" ? "POST" : "PUT";
    try {
      const res = await fetch(url, {
        method: `${fetchMethod}`,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      navigate(`/properties/${data.id}?r=${Date.now()}`);
      return data;
    } catch (err) {
      console.error(`${fetchMethod}:`, err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrMsg("");

    try {
      let imagesArray = Array.isArray(formValues.images)
        ? formValues.images
        : [];

      if (files.length > 0) {
        const uploadPromises = files.map((file) => uploadToR2(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        imagesArray = [...uploadedUrls, ...imagesArray];
      }

      const payload = { ...formValues, images: imagesArray };
      await createProperty(payload);
    } catch (err) {
      console.error(err);
      setErrMsg(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  function onFormChange(val) {
    setFormValues((p) => {
      if (val.images) {
        return { ...p, images: [val.images] };
      } else {
        return { ...p, ...val };
      }
    });
  }
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files) || [];
    const newPreviewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setFiles(selectedFiles);
    setPreviewUrls(newPreviewUrls);
  };

  const removeImage = (i) => {
    const newFiles = files.filter((_, index) => index !== i);
    setFiles(newFiles);
    const newPreviewUrls = previewUrls.filter((_, index) => index !== i);
    setPreviewUrls(newPreviewUrls);
  };

  const removeExistingImage = (i) => {
    const newImages = formValues.images.filter((_, index) => index !== i);
    setFormValues((p) => ({ ...p, images: newImages }));
  };

  return (
    <>
      <form className="grid max-w-4xl gap-6 mx-auto" onSubmit={handleSubmit}>
        {/* Header */}
        <h2 className="text-xl font-semibold">
          {mode === "create" ? "Create" : "Edit"} Property
        </h2>

        {/* Property Details */}
        <fieldset className="border card bg-base-200 border-base-300">
          <div className="card-body">
            <legend className="text-base card-title">Property Details</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  required
                  type="text"
                  value={formValues.title}
                  onChange={(e) => onFormChange({ title: e.target.value })}
                  placeholder="My Awesome House"
                  className="w-full input input-bordered"
                />
              </label>

              {/* Image upload */}
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Property Images</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="file-input file-input-bordered w-full"
                  onChange={handleFileChange}
                />

                {/* Show new uploads */}
                {(previewUrls.length > 0 || formValues.images?.length > 0) && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Image Previews:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {previewUrls.map((url, i) => (
                        <div key={i} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            onClick={() => removeImage(i)}
                            className="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error"
                          >
                            x
                          </button>
                        </div>
                      ))}

                      {/* Show existing images */}
                      {formValues.images?.map((url, i) => (
                        <div key={`existing-${i}`} className="relative">
                          <img
                            src={url}
                            alt={`Existing image ${i + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <div className="absolute -top-2 -right-2">
                            <span className=" badge badge-sm badge-info">
                              Existing
                            </span>
                            <button
                              type="button"
                              onClick={() => removeExistingImage(i)}
                              className="btn btn-xs btn-circle btn-error"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              <label className="form-control md:col-auto">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  value={formValues.bio}
                  onChange={(e) => onFormChange({ bio: e.target.value })}
                  className="textarea textarea-bordered h-28"
                  placeholder="Classic ranch with great bones in mature neighborhood..."
                />
              </label>
            </div>
          </div>
        </fieldset>

        {/* Address */}
        <fieldset className="border card bg-base-200 border-base-300">
          <div className="card-body">
            <legend className="text-base card-title">Property Address</legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                <input
                  required
                  type="text"
                  value={formValues.address}
                  onChange={(e) => onFormChange({ address: e.target.value })}
                  placeholder="123 Cupcake Ln."
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  required
                  type="text"
                  value={formValues.city}
                  onChange={(e) => onFormChange({ city: e.target.value })}
                  placeholder="Los Angeles"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">State</span>
                </div>
                <input
                  required
                  type="text"
                  value={formValues.state}
                  onChange={(e) => onFormChange({ state: e.target.value })}
                  placeholder="CA"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
          </div>
        </fieldset>

        {/* Specs */}
        <fieldset className="border card bg-base-200 border-base-300">
          <div className="card-body">
            <legend className="text-base card-title">
              Property Specifications
            </legend>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Year Built</span>
                </div>
                <input
                  required
                  type="number"
                  value={formValues.yearBuilt}
                  onChange={(e) =>
                    onFormChange({ yearBuilt: Number(e.target.value) })
                  }
                  placeholder="2012"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Square Footage</span>
                </div>
                <input
                  required
                  type="number"
                  step="100"
                  value={formValues.squareFootage}
                  onChange={(e) =>
                    onFormChange({ squareFootage: Number(e.target.value) })
                  }
                  placeholder="2300"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Lot Size (Acres)</span>
                </div>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={formValues.lotSize}
                  onChange={(e) =>
                    onFormChange({ lotSize: Number(e.target.value) })
                  }
                  placeholder=".28"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Bedrooms</span>
                </div>
                <input
                  required
                  type="number"
                  value={formValues.bedrooms}
                  onChange={(e) =>
                    onFormChange({ bedrooms: Number(e.target.value) })
                  }
                  placeholder="4"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Bathrooms</span>
                </div>
                <input
                  required
                  type="number"
                  value={formValues.bathrooms}
                  onChange={(e) =>
                    onFormChange({ bathrooms: Number(e.target.value) })
                  }
                  step="0.5"
                  placeholder="2.5"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Price</span>
                </div>
                <input
                  required
                  type="number"
                  step="25000"
                  value={formValues.cost}
                  onChange={(e) =>
                    onFormChange({ cost: Number(e.target.value) })
                  }
                  placeholder="425000"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control md:col-span-2">
                <div className="label">
                  <span className="label-text">Estimated Value</span>
                </div>
                <input
                  required
                  type="number"
                  step="25000"
                  value={formValues.valuedAt}
                  onChange={(e) =>
                    onFormChange({ valuedAt: Number(e.target.value) })
                  }
                  placeholder="500000"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
          </div>
        </fieldset>

        {/* Sticky footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-2 py-3 border-t bg-base-100">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          {errMsg && <p className="text-error">{errMsg}</p>}
          <button
            type="submit"
            className={`btn btn-primary ${saving ? "loading" : ""}`}
            disabled={saving}
          >
            {mode === "create" ? "Add" : "Save"} Property
          </button>
        </div>
      </form>
    </>
  );
};

export default PropertyForm;
