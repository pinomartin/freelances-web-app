import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { format } from "date-fns";
import Tippy from "@tippyjs/react";
import totalAvatar from "../assets/total.svg";
import hourAvatar from "../assets/hour.svg";

interface Props extends RouteComponentProps<any> {
  data: any;
}

const ProjectCard = ({ data: projectData, history }: Props) => {
  const {
    id,
    name,
    client,
    description,
    type,
    amountXHour,
    estimatedHours,
    estimatedTotal,
    estimatedFinishDate,
    creationDate,
    isNewProject = false,
    // isDone,
  } = projectData;

  

  return (
    <>
      {/* <div className="col-12 col-sm-6 col-lg-4 mb-3 mt-3"> */}
        <div className="card projectListItem__card">
          {/* <div className="card-header no-bordered"> */}
          <div className="card-custom-avatar">
            {type === "hour" ? (
              <Tippy content="Presupuesto x hora">
                <img className="img-fluid" src={hourAvatar} alt="Avatar" />
              </Tippy>
            ) : (
              <Tippy content="Presupuesto Total">
                <img
                  className="img-fluid"
                  src={totalAvatar}
                  alt="Avatar total"
                />
              </Tippy>
            )}
          </div>

          {/* </div> */}
          <br />
          <br />
          <div className="card-body">
            <h5 className="card-title primaryFontColor w-75">{name? name: null}</h5>
            {/* <h6 className="card-subtitle mb-2 secondaryFontColor">{format(creationDate, 'dd/MM/yyyy')}</h6> */}
            <p className="card-text text-right">{client ? (<><strong>Cliente </strong> <p>{client}</p></>) :null}</p>
            <p className="m-0 projectListItem__card__descritionText">
               {description}
            </p>
            </div>


         
           
          <div className="container projectListItem__card__numbersContainer pr-0 pl-0">
              <div className="row no-gutters rounded justify-content-between text-center">
                <div className="col-4 col-md-4">
                  <small>Monto por Hora</small>
                  {/* <p>$ {amountXHour}</p> */}
                </div>
                <div className="col-4 col-md-4">
                  <small>Horas Estimadas</small>
                  {/* <p className="text-warning">{estimatedHours} hs</p> */}
                </div>
                <div className="col-4 col-md-4">
                  <small>Estimado Total </small>
                  {/* <p className="successFontColor">$ {estimatedTotal}</p> */}
                </div>
              </div>
              <div className="row no-gutters rounded justify-content-center text-center align-items-center">
                <div className="col-4 col-md-4">
                  <p className="mb-0">$ {amountXHour}</p>
                </div>
                <div className="col-4 col-md-4">
                  <p className="text-warning mb-0">{estimatedHours} hs</p>
                </div>
                <div className="col-4 col-md-4 ">
                  <p className="successFontColor mb-0">$ {estimatedTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
            {isNewProject ? null : (

            <div className="card-body">
            <small>
              Fecha Entrega:{" "}
              <span className="successFontColor">
                {estimatedFinishDate ? format(estimatedFinishDate, "dd/MM/yyyy"): null}
              </span>
            </small>
            <br />
            <small>
              Fecha Inicio:{" "}
              <span className="secondaryFontColor">
                {creationDate? format(creationDate, "dd/MM/yyyy") :null}
              </span>
            </small>
              <small>
                <Link
                  to={`/projects/${id}`}
                  className="btn btn-primary btn-lg float-right"
                >
                  <i className="far fa-eye"></i>
                </Link>
              </small>
            </div>
            )}
          
        </div>
      {/* </div> */}
    </>
  );
};

export default withRouter(ProjectCard);
