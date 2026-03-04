"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Location = { lat: number; lng: number } | null;

interface LocationContextType {
  location: Location;
  refreshLocation: () => void;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  refreshLocation: () => {},
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<Location>(null);

  const requestLocation = async () => {
    try {
      // Permissions API is optional in TS
      const navWithPerms = navigator as Navigator & {
        permissions?: {
          query: (params: {
            name: PermissionName;
          }) => Promise<PermissionStatus>;
        };
      };

      if (navWithPerms.permissions && "geolocation" in navigator) {
        const result = await navWithPerms.permissions.query({
          name: "geolocation" as PermissionName,
        });

        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (pos: GeolocationPosition) => {
              setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (err: GeolocationPositionError) => {
              console.error("Error getting location:", err);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
          );
        } else if (result.state === "denied") {
          console.warn("User denied location permission.");
        }

        result.onchange = () => requestLocation();
      } else if ("geolocation" in navigator) {
        // Safari / fallback
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err: GeolocationPositionError) =>
            console.error("Error getting location (fallback):", err),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
        );
      }
    } catch (error) {
      console.error("Geolocation request failed:", error);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, refreshLocation: requestLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
