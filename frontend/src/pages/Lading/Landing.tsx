import { useState, ChangeEvent, memo } from "react";
import { GoogleMap } from "@react-google-maps/api";

import { useAllCategoriesWithComplaints } from "../../hooks/useCategory";
import { useGoogleMaps } from '../../hooks/useGoogleMaps'
import Header from "../../components/Header";
import ComplaintMarker from "./components/ComplaintMarker";

function Landing() {
  const { categoriesWithComplaints, isLoading, error } =
    useAllCategoriesWithComplaints();

  // components of Google Maps 
  const { map, isLoaded, onLoad, onUnmount } = useGoogleMaps();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  if (isLoading) {
    return <>Loading..</>;
  } else if (error) {
    return <>Ocurrio un error al obtener los datos {error}</>;
  }

  return (
    <>
      <Header />
      <div className="">
        <div className="min-w-min px-14">
          <div className="flex justify-center items-center gap-5 mt-2 mb-5">
            <button
              className="btn ml-4"
              onClick={() => {
                setSelectedCategory("");
                setselectedState("");
                setStartDate(null);
                setEndDate(null);
              }}
            >
              Todos
            </button>
            <select
              className="select select-bordered w-md max-w-xs ml-4"
              value={selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedCategory(e.target.value)
              }
            >
              <option key="" disabled value="">
                Tipo de denuncia
              </option>
              {categoriesWithComplaints?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-md max-w-xs ml-4"
              value={selectedState}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setselectedState(e.target.value)
              }
            >
              <option disabled value="">
                Estado
              </option>
              <option key="pendiente" value="pendiente">
                Pendiente
              </option>
              <option key="aceptado" value="aceptado">
                Aceptado
              </option>
              <option key="rechazado" value="rechazado">
                Rechazado
              </option>
              <option key="cancelado" value="cancelado">
                Cancelado
              </option>
            </select>
            <input
              type="date"
              className="input input-bordered w-md max-w-xs ml-4"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setStartDate(new Date(`${e.target.value}T00:00`));
              }}
            />
            <input
              type="date"
              className="input input-bordered w-md max-w-xs ml-4"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEndDate(new Date(`${e.target.value}T23:59`));
              }}
            />
          </div>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "auto", height: "500px" }}
              zoom={10}
              center={{ lat: -17.782935, lng: -63.180819 }}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {categoriesWithComplaints?.map((category, index) => {
                // filtrado por categoria de denuncia
                const isCategorySeleted =
                  selectedCategory === "" || selectedCategory === category._id;

                if (isCategorySeleted) {
                  const complaints = category.complaints.map((complaint) => {
                    if (startDate && endDate) {
                      // filtrado por el el rango de fechas
                      const complaintDate = new Date(complaint.createdAt);
                      if (complaintDate < startDate || complaintDate > endDate) {
                        return null;
                      }                      
                    }

                    //filtrado por estadp
                    if (selectedState === "" || selectedState === complaint.state) {
                      return complaint;
                    }
                    
                    return null;
                  });

                  return complaints.map((complaint) => {
                    return (
                      complaint != null && (
                        <ComplaintMarker
                          key={complaint._id}
                          categoryName={category.name}
                          index={index}
                          complaint={complaint}
                          map={map}
                        />
                      )
                    );
                  });
                }

                return null; // la categoria no esta seleccionado
              })}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default memo(Landing);
