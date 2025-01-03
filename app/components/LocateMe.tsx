import { useState } from "react";
import axios from "axios";
import { Locate } from "lucide-react";

type Address = {
  city?: string;
  village?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  state?: string;
  country?: string;
};

type GeocodeResponse = {
  address: Address;
};

const LocateMe: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLocateMe = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get<GeocodeResponse>(
              "https://geocode.maps.co/reverse",
              {
                params: {
                  lat: latitude,
                  lon: longitude,
                  api_key: "6777a4672d80f486654265xafcdb550",
                },
              }
            );

            const { city, village, neighbourhood, suburb } =
              response.data.address;
            const locationName =
              city || village || neighbourhood || suburb || "Unknown location";
            setLocation(locationName);
            setError(null);
          } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setLocation(null);
          }
        },
        (error) => {
          setError(error.message);
          setLocation(null);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div
      className="border border-foreground/50 p-2 rounded-lg flex"
      onClick={handleLocateMe}
    >
      <span className="flex gap-2 py-2 cursor-pointer">
        <Locate className="text-foreground/50" />
        {location === null ? <span>Get Location</span> : location}
      </span>
      {/* <button onClick={handleLocateMe}>Locate Me</button>
      {location && <p>Location: {location}</p>}
      {error && <p>Error: {error}</p>} */}
    </div>
    //     <div className="border border-foreground/50 p-2 rounded-lg flex items-center justify-center">
    //     <span className="flex gap-2 py-2 cursor-pointer">
    //       <Locate className="text-foreground/50" />
    //       {location === null ? <span>Get Location</span> : location}
    //     </span>
    //     <span>{location && <p>Location: {location}</p>}</span>
    //   </div>
  );
};

export default LocateMe;
