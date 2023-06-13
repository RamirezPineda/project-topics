import { useState, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const useGoogleMaps = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDWaQ8sfVh1RMOkmSncezzGh-QbDABjuZ0",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const center = { lat: -17.782935, lng: -63.180819 };
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return { map, isLoaded, onLoad, onUnmount };
};

export { useGoogleMaps };
