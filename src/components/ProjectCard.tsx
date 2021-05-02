import React from "react";
import { format } from 'date-fns';

type Props = {
  data: any;
};

export const ProjectCard = ({ data: projectData }: Props) => {

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
        <div className="card projectListItem__card" onClick={()=> {}}>
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
              ID: <span className="successFontColor">{id}</span>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
