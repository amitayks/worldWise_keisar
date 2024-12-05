import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/CityContext";
import { UseGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { UseUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCity();
  const [mapPosition, setMapPosition] = useState([31, 35]);
  const [mapLat, mapLng] = UseUrlPosition();

  const {
    position: geoPosition,
    isLoading: geoLoading,
    getLocation,
  } = UseGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoPosition) {
      setMapPosition([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type='position' onClick={getLocation}>
          {!geoLoading ? "get location" : "loading..."}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city, i) => {
          const { lat, lng } = city.position;
          return (
            <Marker position={[lat, lng]} key={i}>
              <Popup>{city.cityName}</Popup>
            </Marker>
          );
        })}

        <CenterMap position={mapPosition} />
        <DetectEvent />
      </MapContainer>
    </div>
  );
}

function CenterMap({ position }) {
  const map = useMap();
  map.setView(position);
}

function DetectEvent() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
