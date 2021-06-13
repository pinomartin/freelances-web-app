import { useState, useEffect } from "react";
import { getEstimatedAmount } from "../../hooks/useMoney";
import { getTotalSecondsFromSingleTask } from "../../hooks/useTime";

//Hacer interface de esto ! 
interface TaskListItemProps {
  task: any;
  projectData:any;
}
export const TimeListItem = ({ task, projectData }: TaskListItemProps) => {
  const { description, hours, minutes, seconds } = task;
  const { amountXHour } = projectData;

  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    setTotalSeconds(getTotalSecondsFromSingleTask(task));
  }, [task])

  const renderHours = (hours:number) => {
    if(hours > 0 ) return (<span>{hours} hs </span>);
  };

  const renderMinutes = (minutes:number) => {
    if(minutes > 0 ) return (<span>{minutes} min </span>)
  
  };
  const renderSeconds = (seconds:number) => {
    if(seconds > 0 )
      return (<span>{seconds} sec </span>)
  
    };
  




  return (<>
  <tr>
      {/* <th scope="row">1</th> */}
      <td className="text-warning">{renderHours(hours)} {renderMinutes(minutes)} {renderSeconds(seconds)}</td>
      <td>{description}</td>
      <td className="text-success"><strong>$ {getEstimatedAmount(totalSeconds ,amountXHour)}</strong></td>
    </tr></>)
    // <div className="card bg-dark">
    //   <div className="card-header" id="headingOne">
    //     <p className="p-0 m-0 d-inline primaryFontColor">
    //       <span>{hours}hs </span>
    //       <span>{minutes}min </span>
    //       <span>{seconds}sec </span>
    //     </p>

    //     <button
    //       className="btn btn-primary float-right"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target={`#collapse${id}`}
    //       aria-expanded="true"
    //       aria-controls={`collapse${id}`}
    //     >
    //       <i className="fas fa-info-circle"></i>
    //     </button>
    //   </div>

    //   <div
    //     id={`collapse${id}`}
    //     className="collapse"
    //     aria-labelledby="headingOne"
    //     data-parent="#tasksAccordion"
    //   >
    //     <div className="card-body">
    //       {taskEditionMode ? (
    //         <form onSubmit={(e) => handleSubmitTaskDescriptionUpdate(e)}>
    //           <div className="input-group">
    //             <textarea
    //               className="form-control form-control-sm  customForm__input"
    //               placeholder="Qué hiciste en este tiempo?"
    //               onChange={(e) => setOnEditTaskData({...onEditTaskData, description: e.target.value})}
    //               value={onEditTaskData.description}
    //             />
    //             <button
    //               className="btn btn-success float-right ml-2"
    //               type="submit"
    //             >
    //               <i className="far fa-save"></i>
    //             </button>
    //             <button
    //               className="btn btn-info float-right ml-2"
    //               type="button"
    //               onClick={() => setTaskEditionMode(false)}
    //             >
    //              <i className="fas fa-arrow-right"></i>
    //             </button>
    //           </div>
    //         </form>
    //       ) : (
    //         <>
    //         <div className="row align-items-center">
    //           <div className="col-8">
    //           <p className="m-0">{description}</p>

    //           </div>
    //           <div className="col-4">

             
         
    //           </div>
    //         </div>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  // );
}
