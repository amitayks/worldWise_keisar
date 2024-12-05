import { useState } from "react";

export function UseGeolocation(defaultPosition = null) {
  const [error, setError] = useState("");
  const [position, setPosition] = useState(defaultPosition);
  const [isloading, setIsLoading] = useState(false);

  function getLocation() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { position, isloading, getLocation };
}
