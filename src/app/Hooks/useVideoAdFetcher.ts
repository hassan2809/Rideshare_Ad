import { useEffect, useState } from "react";
import { findStateFromCoords } from "../Utils/utils";
import { toast } from "react-toastify";
import { getVideoAd } from "../Services/feedService";

const getTimeSlot = () => new Date().getHours();
const getDay = () => new Date().toLocaleString("en-US", { weekday: "long" });

export const useVideoAdFetcher = () => {
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const deviceId = localStorage.getItem("deviceId");

  useEffect(() => {
    if (deviceId) {
      (async () => {
        try {
          const res = await fetch(`/api/scale-fusion/location?deviceId=${deviceId}`);
          console.log("response",res)
          if (!res.ok) throw new Error("Scalefusion fetch failed");
          const location = await res.json();
          console.log(location)

          if (location) {
            const { latitude, longitude } = location;
            const state = findStateFromCoords(latitude, longitude);
            const time = getTimeSlot();
            const day = getDay();

            const adResponse = await getVideoAd({ state, time, day });
            setAd(adResponse);
          }
        } catch (error) {
          toast.error("Failed to fetch location from Scalefusion.");
          console.error("Scalefusion error:", error);
          fetchFromGeoLocation();
        } finally {
          setLoading(false);
        }
      })();
    } else {
      fetchFromGeoLocation();
    }
  }, []);

  const fetchFromGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const state = findStateFromCoords(latitude, longitude);
        const time = getTimeSlot();
        const day = getDay();

        try {
          const adResponse = await getVideoAd({ state, time, day });
          setAd(adResponse);
        } catch (error) {
          toast.error("Failed to fetch video ad.");
          console.error("Geo video ad fetch failed:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        toast.error("Failed to get location.");
        console.error("Geolocation error:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
    );
  }

  return { ad, loading };
};
