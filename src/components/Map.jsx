/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition}= useGeolocation()
  
  

  const [maplat, maplng] = useUrlPosition()

  useEffect(()=>{
   if(maplat && maplng) setMapPosition([maplat, maplng])
  }, [maplat, maplng]);


  useEffect(()=>{
    if(geolocationPosition){
      setMapPosition([geolocationPosition.lat , geolocationPosition.lng ])
    }

  }, [geolocationPosition]); 
  return (
    <div
      className={styles.mapContainer}
     
    >
      {!geolocationPosition && <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading': 'Use your position'}
      </Button>}
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
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}
export default Map;
