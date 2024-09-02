import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchFormData, setSearchFormData] = useState({
    query: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [searchedLists, setSearchedLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchFormData({ ...searchFormData, type: e.target.id });
    }

    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSearchFormData({
        ...searchFormData,
        [e.target.id]: Boolean(e.target.checked),
      });
    }

    if (e.target.id === "sort_order") {
      const val = e.target.value.split("_");
      setSearchFormData({
        ...searchFormData,
        sort: val[0] || "created_at",
        order: val[1] || "desc",
      });
    }

    if (e.target.id === "query") {
      setSearchFormData({ ...searchFormData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("query", searchFormData.query);
    urlParams.set("type", searchFormData.type);
    urlParams.set("parking", searchFormData.parking);
    urlParams.set("furnished", searchFormData.furnished);
    urlParams.set("offer", searchFormData.offer);
    urlParams.set("sort", searchFormData.sort);
    urlParams.set("order", searchFormData.order);
    const searchParams = urlParams.toString();
    navigate(`/search?${searchParams}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("query");
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    if (query || type || parking || furnished || offer || sort || order) {
      setSearchFormData({
        query: query || "",
        type: type || "all",
        parking: parking === "true",
        furnished: furnished === "true",
        offer: offer === "true",
        sort: sort || "created_at",
        order: order || "desc",
      });
    }

    const getSearchList = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchParams = urlParams.toString();
        const response = await fetch(`/api/v1/listings/search?${searchParams}`);
        const data = await response.json();

        if (!data.success) {
          setError(data.message);
          setLoading(false);
          return;
        }

        setSearchedLists(data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in getSearchList", error);
      }
    };

    getSearchList();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Query:
            </label>
            <input
              type="text"
              id="query"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={searchFormData.query}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={searchFormData.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={searchFormData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={searchFormData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={searchFormData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={searchFormData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={searchFormData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3">
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
      </div>
    </div>
  );
};

export default Search;
