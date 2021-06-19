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
  return (
    <div className="row report__ProjectSection">
      <div className="col-12 text-center">
        <h1>{name}</h1>
        <div className="row">
          <div className="col-6">

        <p>Cliente: {client}</p>
        <p>Tipo: {projectTypeFormatter(type)}</p>
        <p>
          Fecha creación <br /> {format(creationDate, "dd/MM/yyyy")}
        </p>
        <p>Descripción: {description}</p>
          </div>
          <div className="col-6">
        <p>Precio x Hora: ${amountXHour.toFixed(2)}</p>
        <p>Horas Totales Estimadas: {estimatedHours}hs</p>
        <p>Presupuesto total Estimado: $ {estimatedTotal.toFixed(2)}</p>
        <p>Fecha estimada de Entrega: {format(estimatedFinishDate, "dd/MM/yyyy")}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
