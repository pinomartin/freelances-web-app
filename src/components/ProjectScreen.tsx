import { useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
// import { getProjectsFromUser } from '../firebaseUtils/getFirestoreData';
import Stopwatch from "./StopwatchTimer/Stopwatch";

// interface ProjectDetailProps {

// }

interface URLParamsProps {
  id: string;
}

const ProjectScreen = () => {
  let { id } = useParams<URLParamsProps>();

  useEffect(() => {

  }, [])

  return (
    <div>
      <h4 className="text-white">Hola Soy id {id}</h4>

      <div className="row mt-5">
        <div className="col-12 col-md-4">
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
        <div className="col-12 col-md-8">
        {/* <h3 className="text-center">Tiempos</h3> */}
                <Stopwatch />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProjectScreen);
