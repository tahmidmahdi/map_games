import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import "./App.scss";
import mapDistance from "./Helper/distanceCalculator";
import { CityInterface } from "./Lib/mapData";
import randomCityGenerate from "./Lib/randomCity";

interface LatLngInterface {
  lat: number;
  lng: number;
}
const containerStyle = {
  width: "100%",
  height: "700px",
};
const center = {
  lat: 54.526,
  lng: 15.2551,
};

const App: React.FC = () => {
  const [totalDistance, setTotalDistance] = useState<number>(1500);
  const [latLng, setLatLng] = useState<LatLngInterface>();
  const [occupiedDistance, setOccupiedDistance] = useState(0);
  const [cityGenerate, setCityGenerate] = useState<CityInterface>(
    randomCityGenerate(),
  );

  const credentials = process.env.REACT_APP_MAPS_API;

  const path = [
    { lat: latLng?.lat as number, lng: latLng?.lng as number },
    {
      lat: cityGenerate.position.lat as number,
      lng: cityGenerate.position.lng as number,
    },
  ];

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 100,
    zIndex: 1,
  };

  useEffect(() => {
    if (
      latLng?.lat &&
      latLng?.lng &&
      cityGenerate.position.lat &&
      cityGenerate.position.lng
    ) {
      setOccupiedDistance(
        mapDistance(
          latLng?.lat,
          latLng?.lng,
          cityGenerate.position.lat,
          cityGenerate.position.lng,
        ),
      );
    }
  }, [
    latLng?.lat,
    latLng?.lng,
    cityGenerate.position.lat,
    cityGenerate.position.lng,
  ]);

  useEffect(() => {
    if (totalDistance >= occupiedDistance && totalDistance !== 0) {
      setTotalDistance(totalDistance - occupiedDistance);
    } else {
      setTotalDistance(0);
    }
  }, [occupiedDistance]);

  useEffect(() => {
    if (totalDistance > 0) {
      setTimeout(() => {
        setLatLng({ lat: 0, lng: 0 });
        setCityGenerate(randomCityGenerate());
      }, 10000);
    }
  }, [setCityGenerate, cityGenerate, totalDistance]);

  return (
    <div className="app_component">
      {totalDistance > 0 ? (
        <div>
          <LoadScript googleMapsApiKey={credentials || ""} language="EN">
            <GoogleMap
              id="continent-map"
              mapContainerStyle={containerStyle}
              center={center}
              zoom={4}
              clickableIcons={false}
              onDblClick={(e) =>
                setLatLng({ lat: e?.latLng!.lat(), lng: e.latLng!.lng() })
              }
            >
              {/* Child components, such as markers, info windows, etc. */}
              {latLng?.lat && latLng?.lng && (
                <Marker
                  position={{ lat: latLng?.lat || 0, lng: latLng?.lng || 0 }}
                />
              )}
              {latLng?.lat && latLng?.lng && (
                <Marker
                  position={{
                    lat: cityGenerate.position.lat,
                    lng: cityGenerate.position.lng,
                  }}
                />
              )}
              {latLng?.lat && latLng?.lng && (
                <Polyline path={path} options={options} />
              )}
            </GoogleMap>
          </LoadScript>

          <div className="distance_container">
            <div>
              <h1>Total KM left {totalDistance}</h1>
            </div>
            <div>
              <h1>Find {cityGenerate?.name}</h1>
            </div>
          </div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default React.memo(App);
