import { useGeolocated } from "react-geolocated";

const LocationForm = () => {
  

  const { coords} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });
  console.log(coords);

  return (
    <div> </div>
  );
};

export default LocationForm;
