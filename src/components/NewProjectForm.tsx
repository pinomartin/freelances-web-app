import { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { finishDateProcessorForm } from '../utils/parsetime/finishDateProcessorForm';
import { db, auth } from "../firebase";
import SpinnerLoader from "./SpinnerLoader";
import RadioButton from "./RadioButton";
import { ProjectType } from "../interfaces/project";
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';
import ProjectCard from "./ProjectCard";


const NewProjectForm = ({ history }: RouteComponentProps<any>) => {
  const [project, setProject] = useState({
    name: "",
    client: "",
    description: "",
    type: "hour",
    amountXHour: 0,
    estimatedHours: 0,
    estimatedTotal: 0,
    estimatedHoursPerDay: 0,
    estimatedFinishDate: new Date().toISOString().slice(0, 10),
    creationDate: Date.now(),
  });
  const [error, setError] = useState("");
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);




  useEffect(() => {
    if (!auth.currentUser) {
      history.push("/login");
    }
    estimatedTotalXHourSetter(project.amountXHour, project.estimatedHours);
    if(project.type === 'total'){
      getHoursAndAmountXHourOnFromTotalProject(finishDateProcessorForm(project.estimatedFinishDate), project.creationDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history,project.amountXHour, project.estimatedHours, project.creationDate, project.estimatedFinishDate, project.estimatedHoursPerDay]);

  const estimatedTotalXHourSetter = (amountXHour: number, estimatedHours: number) => {
    if (project.amountXHour !== 0 && project.estimatedHours !== 0) {
      const estimatedTotalXHour = Number(
        (amountXHour * estimatedHours).toFixed(2)
      );
      setProject({
        ...project,
        estimatedTotal: estimatedTotalXHour,
      });
    }
  };

  const getHoursAndAmountXHourOnFromTotalProject = (estimatedFinishDate:number, creationDate:number) => {
    const days =  differenceInBusinessDays(estimatedFinishDate, creationDate);
    const workHours = days * project.estimatedHoursPerDay;
    const amountXHour = Math.round(project.estimatedTotal / workHours);
    setProject({
      ...project,
      amountXHour: amountXHour,
      estimatedHours: workHours
    })
  };

 

  // const finishDateProcessor = (dateFromInput: string) => {
  //   const parsedDate = parse(dateFromInput, "yyyy-MM-dd", new Date()).getTime();
  //   return parsedDate;
  // };

  const radioChangeTypeResetHandler = (event: any) => {
    setProject({
      ...project,
      amountXHour: 0,
      estimatedHours: 0,
      estimatedTotal: 0,
      estimatedHoursPerDay: 0,
      type: event.target.value,
    });
  };


  const projectTypeUIHandler =
    project.type === "hour" ? (
      <>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            $ x Hora
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="0.01"
            step="0.01"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
              setProject({ ...project, amountXHour: Number(e.target.value) })
            }
            value={project.amountXHour}
          />
        </div>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            Horas Estimadas
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="1"
            step="1"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
              setProject({ ...project, estimatedHours: Number(e.target.value) })
            }
            value={project.estimatedHours}
          />
        </div>

        {project.type === "hour" && project.estimatedTotal > 0 ? (
          <p className="text-center primaryFontColor mt-2">
            Monto a cobrar estimado:
            <strong className="input-group-addon p-1 successFontColor w-50">
              ${project.estimatedTotal}
            </strong>
          </p>
        ) : null}
      </>
    ) : (
      <>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            Presupuesto estimado $
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="0.01"
            step="0.01"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
              setProject({ ...project, estimatedTotal: Number(e.target.value) })
            }
            value={project.estimatedTotal}
          />
        </div>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            Horas x dia 
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="1"
            step="1"
            max="24"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
              setProject({ ...project, estimatedHoursPerDay: Number(e.target.value) })
            }
            value={project.estimatedHoursPerDay}
          />
        </div>
      </>
    );

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
      setError("Debe ingresar una breve descripci??n");
      return;
    }
    console.log("Paso todas las pruebas");
    setError("");
    addNewProjectToDB(project);
  };

  const addNewProjectToDB = async (project: ProjectType) => {
    try {
      setIsLoaderVisible(true);
      await db.collection("projects").add({
        userId: auth.currentUser?.email,
        name: project.name,
        client: project.client,
        description: project.description,
        type: project.type,
        amountXHour: project.amountXHour,
        estimatedHours: project.estimatedHours,
        estimatedTotal: project.estimatedTotal,
        estimatedHoursPerDay: project.estimatedHoursPerDay,
        estimatedFinishDate: finishDateProcessorForm(
          `${project.estimatedFinishDate}`
        ),
        creationDate: Date.now(),
        isDone: false,
      });
      history.push("/projects");
    } catch (error) {
      console.log("No se pudo guardar proyecto en DB");
    }
  };

  return !isLoaderVisible ? (
    <>
      <div className="mt-5">
        <h3 className="text-center mb-5">Nuevo Proyecto</h3>
        {/* <span className="primaryFontColor text-center d-block m-0 mb-2 p-0">
          {project.name}
        </span> */}
        <div className="row justify-content-center align-items-center m-0 p-0">
          <div className="col-10 col-sm-8 col-md-6 col-xl-3 mb-5">
            <form onSubmit={(e) => procesarData(e)}>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="input-group mt-1">
                <span className="input-group-addon p-1 primaryFontColor w-25">
                  Nombre
                </span>
                <input
                  type="text"
                  className="form-control form-control-sm mb-2 customForm__input w-50"
                  onChange={(e) =>
                    setProject({ ...project, name: e.target.value })
                  }
                  value={project.name}
                />
              </div>
              <div className="input-group">
                <span className="input-group-addon p-1 pr-3 primaryFontColor w-25">
                  Cliente
                </span>

                <input
                  type="text"
                  className="form-control form-control-sm customForm__input mb-2"
                  onChange={(e) =>
                    setProject({ ...project, client: e.target.value })
                  }
                  value={project.client}
                />
              </div>

              <textarea
                className="form-control form-control-sm mb-2 customForm__input"
                placeholder="De qu?? trata el proyecto?"
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
                value={project.description}
              />

              <div className="input-group text-center">
                <RadioButton
                  id="hour"
                  changed={(e: any) => radioChangeTypeResetHandler(e)}
                  label={"Por Hora"}
                  value={"hour"}
                  isSelected={project.type === "hour"}
                />

                <RadioButton
                  id="total"
                  changed={(e: any) => radioChangeTypeResetHandler(e)}
                  label={"Presuesto Total"}
                  value={"total"}
                  isSelected={project.type === "total"}
                />
              </div>

              {projectTypeUIHandler}

              <div className="input-group">
                <span className="input-group-addon p-1 primaryFontColor w-25">
                  Fecha entrega
                </span>
                <input
                  type="date"
                  className="form-control form-control-sm mb-2 customForm__input currency"
                  placeholder="Presupuesto Inicial"
                  min={new Date().toISOString().slice(0, 10)}
                  step="0.10"
                  data-number-to-fixed="2"
                  data-number-stepfactor="100"
                  onChange={(e: any) =>
                    setProject({
                      ...project,
                      estimatedFinishDate: e.target.value,
                      
                    })
                  }
                  value={project.estimatedFinishDate}
                />
              </div>
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Comenzar !
              </button>
            </form>
          </div>
          <div className="col-10 col-sm-8 col-md-6 col-xl-3 mb-4">
            <ProjectCard data={{...project, isNewProject: true}} key={project.name}/>
          </div>
        </div>
      </div>
    </>
  ) : (
    <SpinnerLoader />
  );
};

export default withRouter(NewProjectForm);
