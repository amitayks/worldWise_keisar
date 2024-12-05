import { useSearchParams } from "react-router-dom";

export function UseUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // console.log("Latitude:", lat);
  // console.log("Longitude:", lng);

  return [lat, lng];
}
