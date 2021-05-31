import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { format } from 'date-fns';

interface Props extends RouteComponentProps<any>{
  data: any;
};

const ProjectCard = ({ data: projectData, history }: Props) => {

  const {
    id,
    name,
    client ,
    description,
    // type,
    amountXHour,
    estimatedHours ,
    estimatedTotal ,
    estimatedFinishDate,
    creationDate } = projectData;

  return (
    <>
      <div className="col-12 col-sm-6 col-lg-4 mb-3 mt-3">
        <div className="card projectListItem__card">
          <div className="card-body">            
            <h5 className="card-title primaryFontColor">{name}</h5>
            {/* <h6 className="card-subtitle mb-2 secondaryFontColor">{format(creationDate, 'dd/MM/yyyy')}</h6> */}
            <p className="card-text">
              {description}
            </p>
            <small>
              Cliente: {client}
            </small>
            <br/>
            <small>
              Horas Estimadas: <span className="text-warning">{estimatedHours} hs.</span>
            </small>
            <br/>
            <small>
              Monto por Hora: $ {amountXHour}
            </small>
            <br/>
            <small>
              Estimado Total: <span className="successFontColor">$ {estimatedTotal}</span>
            </small>
            <br/>
            <small>
              Fecha Entrega: <span className="successFontColor">{format(estimatedFinishDate, 'dd/MM/yyyy')}</span>
            </small>
            <br/>
            <small>
              Fecha Creación: <span className="secondaryFontColor">{format(creationDate, 'dd/MM/yyyy')}</span>
            </small>
            <br/>
            <small>
            <Link to={`/projects/${id}`} className="btn btn-primary float-right">
            <i className="fas fa-plus m-0 p-0"></i>
            </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter (ProjectCard);