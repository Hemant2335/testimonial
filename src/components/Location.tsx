import { useState } from "react";
import { useGeolocated } from "react-geolocated";

const LocationForm = () => {
  

  const { coords} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  return (
    
  );
};

export default LocationForm;
