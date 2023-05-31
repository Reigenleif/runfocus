import { MapContainer,TileLayer,MapContainerProps } from "react-leaflet";

export const Map = () => {
    const mapCenter = [51.505, -0.09]  

  return <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
  </MapContainer>;
};
