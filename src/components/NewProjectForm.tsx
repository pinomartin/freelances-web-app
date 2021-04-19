import React, { useState } from "react";
// import { db, auth } from "../firebase";

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const procesarData = (e: any) => {
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
      setError("Debe ingresar una breve descripción");
      return;
    }
    console.log("Paso todas las pruebas");
    setError("");
  };

  // const createNewProject = async () => {
  //   try {
  //     await db.collection("projects").doc().set({
  //       userId: ''
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <div className="mt-5">
        <h3 className="text-center">Proyecto {<small>{projectName}</small>}</h3>
        <hr />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-xl-3">
            <form onSubmit={(e) => procesarData(e)}>
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

              <textarea
                className="form-control form-control-sm mb-2"
                placeholder="Qué es lo que harás?"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />

              <div className="input-group">
                <span className="input-group-addon pr-2">$</span>
                <input
                  type="number"
                  className="form-control form-control-sm mb-2 currency"
                  placeholder="Presupuesto Inicial"
                  min="0"
                  step="0.01"
                  data-number-to-fixed="2"
                  data-number-stepfactor="100"
                  onChange={(e: any) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>

              <button className="btn btn-dark btn-lg btn-block" type="submit">
                Crear !
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProjectForm;
