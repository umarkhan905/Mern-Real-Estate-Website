const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Name"
            name="name"
            id="name"
            minLength={10}
            maxLength={62}
            required
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required></textarea>
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Address"
            name="address"
            id="address"
            required
          />

          <div className="flex items-center flex-wrap gap-6">
            <div className="flex items-center gap-1">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                min={1}
                max={10}
                required
                className="p-3 rounded-lg border"
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={10}
                name="bedrooms"
                id="bedrooms"
                required
                className="p-3 rounded-lg border"
              />
              <label htmlFor="bedrooms">Bedrooms</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={50}
                max={10000000}
                name="regularPrice"
                id="regularPrice"
                required
                className="p-3 rounded-lg border"
              />
              <div className="flex flex-col items-center">
                <label htmlFor="regularPrice">Regular Price</label>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={50}
                max={10000000}
                name="discountedPrice"
                id="discountedPrice"
                required
                className="p-3 rounded-lg border"
              />
              <div className="flex flex-col items-center">
                <label htmlFor="discountedPrice">Discounted Price</label>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
