import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { db, auth } from "../firebase";

const NewProjectForm = ({history}:RouteComponentProps<any>) => {
  // const [projectName, setProjectName] = useState("");
  // const [clientName, setClientName] = useState("");
  // const [description, setDescription] = useState("");
  // const [amount, setAmount] = useState(0); 
  interface ProjectType{
      name: string,
      client:string,
      description: string,
      amountXHour: number,
      estimatedHours: number,
      estimatedTotal: number,
      creationDate: string
  }

  const [project, setProject] = useState({
    name: '',
    client: '',
    description: '',
    amountXHour: 0,
    estimatedHours: 0,
    estimatedTotal: 0,
    creationDate: new Date().toDateString()
  });
  const [error, setError] = useState("");
  
  const procesarData = (e: any) => {
    e.preventDefault();
    if (!project.name.trim()) {
      setError("Ingrese Nombre de Proyecto");
      return;
    }
    if (!project.client.trim()) {
      setError("Ingrese Cliente");
      return;
    }
    if (!project.description.trim()) {
      setError("Debe ingresar una breve descripción");
      return;
    }
    console.log("Paso todas las pruebas");
    setError("");
    addNewProjectToDB(project);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      history.push("/login");
    }
    
  }, [history]);

  const addNewProjectToDB = async (project:ProjectType) => {
    try {
      await db.collection("projects").add({
        userId: auth.currentUser?.email,
        name: project.name,
        client: project.client,
        description: project.description,
        amountXHour: project.amountXHour,
        estimatedHours: project.estimatedHours,
        estimatedTotal: project.estimatedTotal,
        creationDate: project.creationDate,
        isDone: false
      });
      history.push("/admin");
    } catch (error) {
      console.log('No se pudo guardar proyecto en DB');
    }
  }

  return (
    <>
      <div className="mt-5">
        <h3 className="text-center">
          Proyecto {<small className="primaryFontColor">{project.name}</small>}
        </h3>
        <hr />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-xl-3">
            <form onSubmit={(e) => procesarData(e)}>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="input-group">
                <span className="input-group-addon p-1 primaryFontColor">Nombre</span>
                <input
                  type="text"
                  className="form-control form-control-sm mb-2"
                  placeholder="* Nombre de Proyecto"
                  onChange={(e) => setProject({...project, name: e.target.value})}
                  value={project.name}
                />
              </div>
              <div className="input-group">
                <span className="input-group-addon p-1 pr-3 primaryFontColor">Cliente</span>

                <input
                  type="text"
                  className="form-control form-control-sm mb-2"
                  placeholder="* Cliente"
                  onChange={(e) => setProject({...project, client: e.target.value})}
                  value={project.client}
                />
              </div>

              <textarea
                className="form-control form-control-sm mb-2"
                placeholder="Qué es lo que harás?"
                onChange={(e) => setProject({...project, description: e.target.value})}
                value={project.description}
              />

              <div className="input-group">
                <span className="input-group-addon p-1 primaryFontColor">$ x Hora</span>
                <input
                  type="number"
                  className="form-control form-control-sm mb-2 currency"
                  placeholder="Presupuesto Inicial"
                  min="0"
                  step="0.10"
                  data-number-to-fixed="2"
                  data-number-stepfactor="100"
                  onChange={(e: any) => setProject({...project, amountXHour: e.target.value})}
                  value={project.amountXHour}
                />
              </div>
              <div className="input-group">
                <span className="input-group-addon p-1 primaryFontColor">Cantidad horas</span>
                <input
                  type="number"
                  className="form-control form-control-sm mb-2 currency"
                  placeholder="Presupuesto Inicial"
                  min="0"
                  step="1"
                  data-number-to-fixed="2"
                  data-number-stepfactor="100"
                  onChange={(e: any) => setProject({...project, estimatedHours: e.target.value})}
                  value={project.estimatedHours}
                />
              </div>
              <div className="input-group">
                <span className="input-group-addon p-1 primaryFontColor">
                  Presupuesto estimado
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm mb-2 currency"
                  placeholder="Presupuesto Inicial"
                  min="0"
                  step="0.10"
                  data-number-to-fixed="2"
                  data-number-stepfactor="100"
                  onChange={(e: any) => setProject({...project, estimatedTotal: e.target.value})}
                  value={project.estimatedTotal}
                />
              </div>
              <div className="input-group">
                <span className="input-group-addon p-1 primaryFontColor">
                  Fecha tentativa
                </span>
                <input
                  type="date"
                  className="form-control form-control-sm mb-2 currency"
                  placeholder="Presupuesto Inicial"
                  min="0"
                  step="0.10"
                  data-number-to-fixed="2"
                  data-number-stepfactor="100"
                  onChange={(e: any) => setProject({...project, creationDate: e.target.value})}
                  value={project.creationDate}
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

export default withRouter(NewProjectForm);
