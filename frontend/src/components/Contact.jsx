import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/v1/users/${listing.user}`);
        const data = await res.json();

        setLandlord(data.data);
      } catch (error) {
        console.log("Error in fetchLandlord", error);
      }
    };

    fetchLandlord();
  }, [listing.user]);
  return (
    <div className="flex flex-col gap-2">
      <p>
        Contact{" "}
        <span className="font-semibold">
          {landlord.username} for{" "}
          <span className="font-semibold">{listing.name.toLowerCase()}</span>
        </span>
      </p>
      <textarea
        name="message"
        id="message"
        rows="2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
        className="w-full border p-3 rounded-lg"></textarea>
      <Link
        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
        className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
        send message
      </Link>
    </div>
  );
};

export default Contact;
