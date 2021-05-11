import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { getProjectByID } from '../firebaseUtils/getFirestoreData';
import Stopwatch from "./StopwatchTimer/Stopwatch";

// interface ProjectDetailProps {

// }

interface URLParamsProps {
  id: string;
}

const ProjectScreen = () => {
  let { id } = useParams<URLParamsProps>();

  const [projectData, setProjectData] = useState<any>({});
  console.log(projectData);

  useEffect(() => {
    getProjectByID(id).then(project=> setProjectData(project));
  }, [id])

  return (
    <div>
      {/*  {/*REVISAR ESTO !!!!*/ } 

      <div className="d-flex p-0">

      <div className="sidebar-container">
            
            <div className="menu">
                <button className="d-block btn-block  p-3 border-0"><i className="far fa-paper-plane mr-2"></i>
                    Proyecto</button>
                <button className="d-block btn-block p-3 border-0"><i className="far fa-clock mr-2"></i>
                    Tiempos</button>
                <button  className="d-block btn-block p-3 border-0"><i className="far fa-chart-bar mr-2"></i>
                    Reportes</button>
            </div>
        </div>
      <div className="w-100">
      <div className="row m-0">
        <div className="col-12">
        <h4 className="text-white"><small>Proyecto</small> {projectData?.name}</h4>
        </div>
        <div className="col-12 col-md-4 p-0">
        <h3 className="text-center">Tiempos</h3>
          <div className="accordion" id="accordionExample">
            <div className="card bg-dark">
              <div className="card-header" id="headingOne">
                <p className="p-0 m-0 d-inline">Descripcion</p>

                <button
                  className="btn btn-danger float-right ml-1 "
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
                <button
                  className="btn btn-info float-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  Some placeholder content for the first accordion panel. This
                  panel is shown by default, thanks to the <code>.show</code>{" "}
                  className.
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Collapsible Group Item #2
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  Some placeholder content for the second accordion panel. This
                  panel is hidden by default.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
                <Stopwatch />
        </div>
      </div>
      </div>
      </div>

    </div>
  );
};

export default withRouter(ProjectScreen);
