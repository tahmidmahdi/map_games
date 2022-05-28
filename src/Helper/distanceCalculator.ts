// To calculate distance between two points using Latitude and Longitude
const mapDistance = (
  lat_marker: number,
  lng_marker: number,
  lat_specific: number,
  lng_specific: number,
) => {
  const piDivide = 0.017453292519943295; // Math.PI / 180
  const cosTheta = Math.cos;
  const accumulateDistance =
    0.5 -
    cosTheta((lat_specific - lat_marker) * piDivide) / 2 +
    (cosTheta(lat_marker * piDivide) *
      cosTheta(lat_specific * piDivide) *
      (1 - cosTheta((lng_specific - lng_marker) * piDivide))) /
      2;

  //  Returning values in K.M(KiloMeter)
  return 12742 * Math.asin(Math.sqrt(accumulateDistance)); // 2 * R; R = 6371 km
};

export default mapDistance;
