import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../services/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  // const [imageUploadingError, setImageUploadingError] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUploadingLoading, setImageUploadingLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const navigate = useNavigate();

  const handleImageUpload = async () => {
    try {
      setImageUploadingLoading(true);
      if (imageFiles.length === 0) {
        setError("Please select at least one image");
        setImageUploadingLoading(false);
        return;
      }

      if (imageFiles.length + formData.imageUrls.length > 6) {
        setError("Please select at most 6 images");
        setImageUploadingLoading(false);
        return;
      }

      const promises = [];

      Array.from(imageFiles)?.forEach((file) => {
        promises.push(storeImage(file));
      });

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadingLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setImageUploadingLoading(false);
        });
    } catch (error) {
      console.log("Error in handleImageUpload", error);
      setError(error.message);
      setImageUploadingLoading(false);
    }
  };

  const storeImage = async (file) => {
    try {
      return new Promise((resolve, _) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.log("Error in storeImage", error);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, ind) => ind !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
      setError("Please select at least one image");
      return;
    }
    if (Number(formData.regularPrice) < Number(formData.discountedPrice)) {
      setError("Regular price cannot be less than discounted price");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/v1/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.success("Listing created successfully");
      navigate(`/listing/${data.data._id}`);
    } catch (error) {
      console.log("Error in handleSubmit", error);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
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
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            value={formData.description}
            onChange={handleChange}></textarea>
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Address"
            name="address"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex items-center flex-wrap gap-6">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <label htmlFor="sale">Sell</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                checked={formData.parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                value={formData.offer}
                onChange={handleChange}
              />
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
                value={formData.bathrooms}
                onChange={handleChange}
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
                value={formData.bedrooms}
                onChange={handleChange}
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
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <label htmlFor="regularPrice">Regular Price</label>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={10000000}
                  name="discountedPrice"
                  id="discountedPrice"
                  required
                  className="p-3 rounded-lg border"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="discountedPrice">Discounted Price</label>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
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
              onChange={(e) => setImageFiles(e.target.files)}
            />
            <button
              onClick={handleImageUpload}
              disabled={imageUploadingLoading}
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              {imageUploadingLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {formData.imageUrls?.length > 0 && (
            <div className="flex flex-col gap-3">
              {formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex items-center justify-between px-3">
                  <img
                    src={url}
                    alt="listing"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Creating..." : "create listing"}
          </button>
          {error && <p className="text-red-500">**{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
