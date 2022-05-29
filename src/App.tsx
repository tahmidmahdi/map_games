import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import MapsData from "./components/MapsData/MapsData";
import RefreshPage from "./components/RefreshPage/RefreshPage";
import mapDistance from "./Helper/distanceCalculator";
import { CityInterface } from "./Lib/mapData";

export interface LatLngInterface {
  lat: number;
  lng: number;
}
const containerStyle = {
  width: "100%",
  height: "600px",
};
const center = {
  lat: 54.526,
  lng: 15.2551,
};

const App: React.FC = () => {
  // useState hooks
  const [totalDistance, setTotalDistance] = useState<number>(1500);
  const [rightGuess, setRightGuess] = useState<number>(0);
  const [latLng, setLatLng] = useState<LatLngInterface>();
  const [occupiedDistance, setOccupiedDistance] = useState<number>(0);
  // const [counter, setCounter] = useState(10);
  const [cityGenerate, setCityGenerate] = useState<CityInterface>({
    name: "",
    position: { lat: 0, lng: 0 },
  });

  // required Env(s)
  const credentials = process.env.REACT_APP_MAPS_API;

  // variables
  // to defines the paths
  const path = [
    { lat: latLng?.lat as number, lng: latLng?.lng as number },
    {
      lat: cityGenerate.position.lat as number,
      lng: cityGenerate.position.lng as number,
    },
  ];

  // properties of tow points
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

  const setData = useCallback(() => {
    if (
      totalDistance &&
      totalDistance >= occupiedDistance &&
      totalDistance !== 0
    ) {
      setTotalDistance(totalDistance - occupiedDistance);
      if (occupiedDistance <= 50 && occupiedDistance !== 0) {
        setRightGuess(rightGuess + 1);
      }
    } else {
      setTotalDistance(0);
    }
  }, [occupiedDistance]);

  // useEffect hooks
  useEffect(() => {
    if (
      latLng?.lat !== 0 &&
      latLng?.lng !== 0 &&
      cityGenerate.position.lat !== 0 &&
      cityGenerate.position.lng !== 0
    ) {
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
    }
  }, [
    latLng?.lat,
    latLng?.lng,
    cityGenerate.position.lat,
    cityGenerate.position.lng,
  ]);

  useEffect(() => {
    if (occupiedDistance) {
      setData();
    }
  }, [occupiedDistance, setData]);

  useEffect(() => {
    if (cityGenerate.position.lat === 0 && cityGenerate.position.lng === 0) {
      setLatLng({ lat: 0, lng: 0 });
    }
  }, [cityGenerate.position.lat, cityGenerate.position.lng]);

  return (
    <main className="app_component">
      {totalDistance > 0 ? (
        <div>
          <LoadScript googleMapsApiKey={credentials || ""} language="EN">
            <GoogleMap
              id="continent-map"
              mapContainerStyle={containerStyle}
              center={center}
              zoom={4}
              clickableIcons={false}
              onClick={(e) =>
                setLatLng({ lat: e?.latLng!.lat(), lng: e.latLng!.lng() })
              }
            >
              {latLng?.lat !== 0 &&
                latLng?.lng !== 0 &&
                cityGenerate.position.lat !== 0 &&
                cityGenerate.position.lng !== 0 && (
                  <>
                    <Marker
                      position={{
                        lat: latLng?.lat || 0,
                        lng: latLng?.lng || 0,
                      }}
                    />
                    <Marker
                      position={{
                        lat: cityGenerate.position.lat,
                        lng: cityGenerate.position.lng,
                      }}
                    />
                    <Polyline path={path} options={options} />
                  </>
                )}
            </GoogleMap>
          </LoadScript>

          <MapsData
            cityGenerate={cityGenerate}
            setCityGenerate={setCityGenerate}
            totalDistance={totalDistance}
            rightGuess={rightGuess}
          />
        </div>
      ) : (
        <RefreshPage rightGuess={rightGuess} />
      )}
    </main>
  );
};

export default App;
