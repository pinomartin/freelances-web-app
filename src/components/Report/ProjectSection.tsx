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
        estimatedFinishDate?: string | number;
        estimatedHoursPerDay: number;
        creationDate: number;
    }
}
const ProjectSection = ({ data }:ProjectDataProps) => {

    const projectTypeFormatter = (type:string) => {
        switch (type) {
            case 'hour':
                return 'Presupuesto por Hora'; 
                
            case 'total': 
                return 'Presupuesto Total';
            default:
                return ''
        }
    };

    const { name,client,type,creationDate,description,amountXHour,estimatedHours,estimatedHoursPerDay,estimatedTotal,estimatedFinishDate } = data;
    return (
        <div className="row bg-danger">
            <div className="col-12">
               <h1>{name}</h1>
               <h4>Cliente: {client}</h4>
               <p>Tipo: {projectTypeFormatter(type)}</p>
               <p>Fecha creación <br /> {format(creationDate, "dd/MM/yyyy")}</p>
               <p>Descripción: {description}</p>
               <p>Precio x Hora: ${amountXHour}</p>
               <p>{estimatedHours}</p>
               <p>{estimatedHoursPerDay}</p>
               <p>{estimatedTotal}</p>
               <p>{estimatedFinishDate}</p>
            </div>
        </div>
    )
}

export default ProjectSection
