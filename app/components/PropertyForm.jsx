const PropertyForm = ({ initValues, mode, onSubmit }) => {
  return (
    <>
      <form className="grid max-w-4xl gap-6 mx-auto">
        {/* Header */}
        <h2 className="text-xl font-semibold">Create Property</h2>

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
                  type="text"
                  placeholder="My Awesome House"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Image URL</span>
                </div>
                <input
                  type="text"
                  placeholder="/images/015/exterior.webp"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control md:col-auto">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
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
                  type="text"
                  placeholder="123 Cupcake Ln."
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  placeholder="Los Angeles"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">State</span>
                </div>
                <input
                  type="text"
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
                  type="number"
                  placeholder="2012"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Square Footage</span>
                </div>
                <input
                  type="number"
                  placeholder="2300"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Lot Size (Acres)</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder=".38"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Bedrooms</span>
                </div>
                <input
                  type="number"
                  placeholder="4"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Bathrooms</span>
                </div>
                <input
                  type="number"
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
                  type="number"
                  placeholder="425000"
                  className="w-full input input-bordered"
                />
              </label>

              <label className="form-control md:col-span-2">
                <div className="label">
                  <span className="label-text">Estimated Value</span>
                </div>
                <input
                  type="number"
                  placeholder="500000"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
          </div>
        </fieldset>

        {/* Sticky footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-2 py-3 border-t bg-base-100">
          <button type="button" className="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Property
          </button>
        </div>
      </form>
    </>
  );
};

export default PropertyForm;

<fieldset className="p-4 border fieldset bg-base-200 border-base-300 rounded-box w-xs">
  <legend className="fieldset-legend">Page details</legend>

  <label className="label">Title</label>
  <input type="text" className="input" placeholder="My awesome page" />

  <label className="label">Slug</label>
  <input type="text" className="input" placeholder="my-awesome-page" />

  <label className="label">Author</label>
  <input type="text" className="input" placeholder="Name" />
</fieldset>;
