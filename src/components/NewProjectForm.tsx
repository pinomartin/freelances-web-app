import React, { useState } from "react";

const NewProjectForm = () => {

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState("");

  const procesarData = (e: any) => {
    console.log(typeof e);
    e.preventDefault();
    if (!projectName.trim()) {
      setError("Ingrese Nombre de Proyecto");
      return;
    }
    if (!clientName.trim()) {
      setError("Ingrese Cliente");
      return;
    }
    if (!description.trim()) {
      setError("Debe Ingresar una breve descripción del proyecto");
      return;
    }
    console.log("Paso todas las pruebas");
    setError("");

  };

  
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-3">
          <form onSubmit={() => procesarData}>
            {error && <div className="alert alert-danger">{error}</div>}

            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Nombre de Proyecto"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            />

            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Cliente"
              onChange={(e) => setClientName(e.target.value)}
              value={clientName}
            />

            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Descripcion"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <button className="btn btn-dark btn-lg btn-block" type="submit">
              "Crear Proyecto"
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProjectForm;
