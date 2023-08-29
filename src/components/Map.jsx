/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../context/CitiesContext";

const Map = () => {
  const { cities } = useCities();

  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const maplat = searchParams.get("lat");
  const maplng = searchParams.get("lng");

  useEffect(()=>{
   if(maplat && maplng) setMapPosition([maplat, maplng])
  }, [maplat, maplng]);


  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form");
      // }}
    >
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectClick/>
        <ChangeCenter position={mapPosition}/>
      </MapContainer>
    </div>
  );
};

function ChangeCenter({position}){
  const map = useMap()

  map.setView(position)

  return null;
}

function DetectClick(){
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&${e.latlng.lng}`)
    }
  })
}
export default Map;
