import axios from "axios";
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
console.log("GOOGLE_MAPS_API_KEY", GOOGLE_MAPS_API_KEY)

export interface Coordinates {
    lat: number;
    lng: number;
}

export const getCoordinatesFromAddress = async (
    address: string
): Promise<Coordinates | null> => {
    if (!address) return null;

    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${GOOGLE_MAPS_API_KEY}`;

        const { data } = await axios.get(url);
        console.log(data)

        if (data.status === "OK" && data.results.length > 0) {
            return data.results[0].geometry.location as Coordinates;
        }

        console.warn("Geocoding failed:", data.status, data.error_message);
        return null;
    } catch (error) {
        console.error("Error while geocoding address:", error);
        return null;
    }
};
