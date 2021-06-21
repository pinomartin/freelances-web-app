import { format } from "date-fns";

interface ProjectDataProps {
  data: {
    name: string;
    client: string;
    description: string;
    type: string;
    amountXHour: number;
    estimatedHours: number;
    estimatedTotal: number;
    estimatedFinishDate: number;
    estimatedHoursPerDay: number;
    creationDate: number;
  };
}
const ProjectSection = ({ data }: ProjectDataProps) => {
  const projectTypeFormatter = (type: string) => {
    switch (type) {
      case "hour":
        return "Presupuesto por Hora";

      case "total":
        return "Presupuesto Total";
      default:
        return "";
    }
  };

  const {
    name,
    client,
    type,
    creationDate,
    description,
    amountXHour,
    estimatedHours,
    estimatedTotal,
    estimatedFinishDate,
  } = data;
  return (<>
        <h3 className="text-capitalize text-center">{name}</h3>
    <div className="row report__ProjectSection">
      <div className="col-12 text-center">
        <div className="row pt-2">
          <div className="col-12 col-md-6 text-left">
            <p>
              <strong>CLIENTE:</strong> {client}
            </p>
            <p>
              <strong>TIPO:</strong> {projectTypeFormatter(type)}
            </p>
            <p>
              <strong>FECHA CREACION:</strong>{" "}
              {format(creationDate, "dd/MM/yyyy")}
            </p>
            <p>
              <strong>DESCRIPCION:</strong> {description}
            </p>
          </div>
          <div className="col-12 col-md-6 text-right">
            <p>
              <strong>PRECIO X HORA:</strong> ${amountXHour.toFixed(2)}
            </p>
            <p>
              <strong>HORAS ESTIMADAS:</strong> {estimatedHours}hs
            </p>
            <p>
              <strong>PRESUPUESTO ESTIMADO:</strong> ${" "}
              {estimatedTotal.toFixed(2)}
            </p>
            <p>
              <strong>FECHA ESTIMADA ENTREGA:</strong>{" "}
              {format(estimatedFinishDate, "dd/MM/yyyy")}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectSection;
