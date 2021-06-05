import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import formatDistance from 'date-fns/formatDistance'
import { es } from "date-fns/esm/locale";



export const ProjectData = ({projectData, tasks }:any) => {

    console.log(projectData);
    console.log(tasks);

    const getDaysRemaining = formatDistanceStrict(Date.now(), projectData.estimatedFinishDate, {unit: "day",addSuffix: false, locale: es});
    const getRemaingHours = '';




    return (
        <>
            {/* <h4>Datos Proyecto</h4> */}
            <div className="container bg-dark rounded">
            <br />
            <br />
            <div className="row justify-content-end">
                <div className="col-6 text-center">
                    <small className="d-block">Horas restantes</small>
                    <span className="text-success">10</span>
                </div>
                <div className="col-6 text-center">
                    <span>{getDaysRemaining}</span>
                    <small className="d-block">restantes</small>
                </div>
            </div>
            <br />
            <br />
            <div className="row justify-content-end">
                <div className="col-6 text-center">
                    <small className="d-block">Horas restantes</small>
                    <span>10</span>
                </div>
                <div className="col-6 text-center">
                    <small className="d-block">Horas restantes</small>
                    <span>10</span>
                </div>
            </div>
            <br />
            <br />
            </div>
        </>
    )
}
