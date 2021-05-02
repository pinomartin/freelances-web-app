import React from "react";
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
    amountXHour,
    estimatedHours ,
    estimatedTotal ,
    creationDate } = projectData;

  return (
    <>
      <div className="col-12 col-sm-6 col-lg-4 mb-3 mt-3">
        <div className="card projectListItem__card">
          <div className="card-body">            
            <h5 className="card-title primaryFontColor">{name}</h5>
            <h6 className="card-subtitle mb-2 secondaryFontColor">{format(creationDate, 'dd/MM/yyyy HH:mm:ss')}</h6>
            <p className="card-text">
              {description}
            </p>
            <small>
              Cliente: {client}
            </small>
            <br/>
            <small>
              Horas Estimadas: {estimatedHours}
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
            <Link to={`/projects/${id}`}>
              ID: <span className="successFontColor">{id}</span>
            </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter (ProjectCard);