import { MapContainer, TileLayer, MapContainerProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapUtil } from "../../util/use-map-util";
import { Flex } from "@chakra-ui/react";

export const Map = () => {
  const { loading, error, currentLoc } = useMapUtil();
  console.log(currentLoc);

  return (
    <Flex w="80%" h="10em" mx="auto" justifyContent="center" mt="1em">
       <MapContainer
      center={[-6.890871, 107.610327]}
      zoom={15.5}
      style={{
        height: "100%",
        width: "min(90%,30em)",
        borderRadius: "4px",
        zIndex: 0,
      }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </Flex>
  );
};
