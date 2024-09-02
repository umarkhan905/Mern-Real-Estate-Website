import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [isListingFound, setIsListingFound] = useState(false);
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchListingInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/listings/${id}`);
        const data = await res.json();

        if (!data.success) {
          setIsListingFound(false);
          setLoading(false);
          return;
        }

        setListing(data.data);
        setIsListingFound(true);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetchListingInfo", error);
        setIsListingFound(false);
        setLoading(false);
      }
    };

    fetchListingInfo();
  }, []);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {!loading && !isListingFound && (
        <p className="text-center my-7 text-2xl">Listing not found</p>
      )}

      {isListingFound && listing && !loading && (
        <>
          <Swiper navigation>
            {listing?.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[350px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
