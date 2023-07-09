import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import CreatableSelect from "react-select/creatable";
// import { ActionMeta } from "react-select";

import { PrivateRoutes } from "../../../../constants/routes";
import { useAddTypeOfComplaint } from "../../../../hooks/useTypeComplaint";
import { TypeComplaintCustomForm } from "../../../../interfaces/typeComplaint.interface";

type OptionsType = {
  value: string;
  label: string;
};

function AddTypeOfComplaint() {
  const navigate = useNavigate();
  const { addTypeOfComplaint, isMutating } = useAddTypeOfComplaint();
  const [selectedTags, setSelectedTags] = useState<OptionsType[]>([]);

  const handleSubmit = async (e: FormEvent<TypeComplaintCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const name = elements.name.value;
    const tags: string[] = [];

    for (const element of selectedTags) {
      tags.push(`${element.label}`.trim());
    }

    try {
      const response = await addTypeOfComplaint({ name, tags });
      if (response?._id) {
        console.log(response);
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.TYPESOFCOMPLAINT}`, {
          replace: true,
        });
        toast.success("Tipo de denuncia creado exitosamente!");
      } else {
        toast.error("Ocurrio un error, vuelve a intentarlo mas tarde");
      }
    } catch (error) {
      toast.error("Ocurrio un error, vuelve a intentarlo mas tarde");
    }
  };

  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <Toaster />
      <div className="m-2 mb-0">
        <label className="label text-center text-base">
          <Link
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.TYPESOFCOMPLAINT}`}
            className="link link-hover"
          >
            <button className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              Atras
            </button>
          </Link>
        </label>
      </div>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl">Crear nuevo tipo de denuncia</h1>
          <p>Ingrese los datos del formulario</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <CreatableSelect
            isMulti
            required
            placeholder="Tags en ingles"
            defaultValue={selectedTags}
            onChange={(option: readonly OptionsType[]) => {
              // actionMeta: ActionMeta< OptionsType >
              // copio los elementos de "option" por que es readonly
              const optionsChange = option.map((element) => ({
                ...element,
              }));
              setSelectedTags(optionsChange);
            }}
          />
        </div>

        <button className="btn bg-green-700 text-white hover:bg-green-600" disabled={isMutating}>
          {isMutating ? (
            <span className="loading loading-spinner"></span>
          ) : null}
          {isMutating ? "Creando" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default AddTypeOfComplaint;
