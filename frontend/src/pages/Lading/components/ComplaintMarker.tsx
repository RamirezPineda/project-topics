import { useState } from "react";

import { Marker, InfoWindow } from "@react-google-maps/api";
import { Complaint } from "../../../interfaces/complaint.interface";

interface Props {
  categoryName: string;
  index: number;
  complaint: Complaint;
  map: google.maps.Map | null;
}

const colors: string[] = [
  "blue",
  "red",
  "organge",
  "black",
  "lime",
  "yellow",
  "purple",
  "teal",
];

function ComplaintMarker({ categoryName, index, complaint, map }: Props) {
  const [selectedComplaint, setselectedComplaint] = useState<null | string>(
    null
  );

  return (
    <Marker
      key={complaint._id}
      visible={!!map}
      position={{
        lat: complaint.latitude,
        lng: complaint.longitude,
      }}
      title={categoryName}
      options={{
        icon: {
          fillColor: colors[index], // Color de relleno del círculo
          fillOpacity: 1, // Opacidad del relleno del círculo (0 a 1)
          strokeColor: colors[index], // Color del borde del círculo
          strokeOpacity: 0.8, // Opacidad del borde del círculo (0 a 1)
          scale: 4,
          path: google.maps.SymbolPath.CIRCLE,
        },
      }}
      onClick={() => setselectedComplaint(complaint._id)}
    >
      {selectedComplaint && selectedComplaint == complaint._id ? (
        <InfoWindow>
          <div className="text-black">{complaint.title}</div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
}

export default ComplaintMarker;
