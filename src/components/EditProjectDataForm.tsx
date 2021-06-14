import { differenceInBusinessDays } from "date-fns";
import { useState, useEffect } from "react";
import { updateProjectDB } from '../firebaseUtils/setFirestoreData'; 
import { ProjectType } from '../interfaces/project';
import { finishDateProcessorForm } from '../utils/parsetime/finishDateProcessorForm';


export const EditProjectDataForm = ({projectData, projectUID }:any) => {
    const [error, setError] = useState('');
    const [onEditProjectData, setOnEditProjectData] = useState<ProjectType>({...projectData, estimatedFinishDate: new Date().toISOString().slice(0, 10)});

    useEffect(() => {
      estimatedTotalXHourSetter(onEditProjectData.amountXHour, onEditProjectData.estimatedHours);
      if(projectData.type === 'total'){
        getHoursAndAmountXHourOnFromTotalProject(finishDateProcessorForm(`${onEditProjectData.estimatedFinishDate}`), onEditProjectData.creationDate);
      }
    },
     // eslint-disable-next-line react-hooks/exhaustive-deps
     [onEditProjectData.amountXHour, onEditProjectData.estimatedHours, onEditProjectData.estimatedFinishDate, onEditProjectData.creationDate, onEditProjectData.estimatedTotal, onEditProjectData.estimatedHoursPerDay]);

    const estimatedTotalXHourSetter = (amountXHour: number, estimatedHours: number) => {
      if (onEditProjectData.amountXHour !== 0 || onEditProjectData.estimatedHours !== 0) {
        const estimatedTotalXHour = Number(
          (amountXHour * estimatedHours).toFixed(2)
        );
        setOnEditProjectData({
          ...onEditProjectData,
          estimatedTotal: estimatedTotalXHour,
        });
      }
    };

    const getHoursAndAmountXHourOnFromTotalProject = (estimatedFinishDate:number, creationDate:number) => {
      const days =  differenceInBusinessDays(estimatedFinishDate, creationDate);
      const workHours = days * onEditProjectData.estimatedHoursPerDay;
      const amountXHour = Math.round(onEditProjectData.estimatedTotal / workHours);
      setOnEditProjectData({
        ...onEditProjectData,
        amountXHour: amountXHour,
        estimatedHours: workHours
      })
    };
  
    console.log(onEditProjectData);

    const projectTypeUIHandler =
    onEditProjectData.type === "hour" ? (
      <>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            $ x Hora
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="0"
            step="0.01"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
                setOnEditProjectData({ ...onEditProjectData, amountXHour: Number(e.target.value) })
            }
            value={onEditProjectData.amountXHour}
          />
        </div>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            Horas Estimadas
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="0"
            step="1"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
                setOnEditProjectData({ ...onEditProjectData, estimatedHours: Number(e.target.value) })
            }
            value={onEditProjectData.estimatedHours}
          />
        </div>
                    {/* {ESTE ES EL CALCULADOR PREVIO ,,,, } */}
        {onEditProjectData.type === "hour" && onEditProjectData.estimatedTotal > 0 ? (
          <p className="text-center primaryFontColor mt-2">
            Monto a cobrar estimado:
            <strong className="input-group-addon p-1 successFontColor w-50">
              ${onEditProjectData.estimatedTotal}
            </strong>
          </p>
        ) : null}
      </>
    ) : (
      <>
        <div className="input-group">
          <span className="input-group-addon p-1 primaryFontColor w-50">
            Presupuesto total estimado
          </span>
          <input
            type="number"
            className="form-control form-control-sm mb-2 customForm__input currency"
            min="0"
            step="0.01"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
                setOnEditProjectData({ ...onEditProjectData, estimatedTotal: Number(e.target.value) })
            }
            value={onEditProjectData.estimatedTotal}
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
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            onChange={(e: any) =>
              setOnEditProjectData({ ...onEditProjectData, estimatedHoursPerDay: Number(e.target.value) })
            }
            value={onEditProjectData.estimatedHoursPerDay}
          />
        </div>
      </>
    );
    const procesarData = (e: any) => {
        e.preventDefault();
        if (!onEditProjectData.name.trim()) {
          setError("Ingrese Nombre de Proyecto");
          return;
        }
        if (!onEditProjectData.client.trim()) {
          setError("Ingrese Cliente");
          return;
        }
        if (!onEditProjectData.description.trim()) {
          setError("Debe ingresar una breve descripción");
          return;
        }
        if(onEditProjectData.estimatedTotal === 0){
          setError("Ajuste $ x Hora / Horas");
          return;
        }
        console.log("Paso todas las pruebas");
        setError("");

        updateProjectDB(onEditProjectData, projectUID);
        
      };
    return (
        <>
        <h4 className='text-center'>Edicion Proyecto</h4>
        <small className='text-center primaryFontColor d-block'>Tipo de Proyecto: {onEditProjectData.type === 'hour' ? 'Hora' : 'Presupuesto Total'}</small>
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
                    setOnEditProjectData({ ...onEditProjectData, name: e.target.value })
                  }
                  value={onEditProjectData.name}
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
                    setOnEditProjectData({ ...onEditProjectData, client: e.target.value })
                  }
                  value={onEditProjectData.client}
                />
              </div>

              <textarea
                className="form-control form-control-sm mb-2 customForm__input"
                placeholder="De qué trata el proyecto?"
                onChange={(e) =>
                    setOnEditProjectData({ ...onEditProjectData, description: e.target.value })
                }
                value={onEditProjectData.description}
              />

              {/* <div className="input-group text-center">
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
              </div> */}

              {projectTypeUIHandler}

              <div className="input-group mb-3">
                <span className="input-group-addon p-1 primaryFontColor w-50">
                  Fecha tentativa
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
                    setOnEditProjectData({
                      ...onEditProjectData,
                      estimatedFinishDate: e.target.value,
                    })
                  }
                  value={onEditProjectData.estimatedFinishDate}
                />
              </div>
              <button className="btn btn-primary float-right " type="submit">
                  Actualizar
              </button>
            </form>
        </>
    )
}
