import { TasksListProps } from '../interfaces/tasklist';

export const TasksList = ({projectUID, clientUID}:TasksListProps) => {


  console.log( projectUID, clientUID );
    return (
        <>
          <h3 className="text-center">Tiempos</h3>
          <div className="accordion" id="accordionExample">
            <div className="card bg-dark">
              <div className="card-header" id="headingOne">
                <p className="p-0 m-0 d-inline">Tiempo</p>

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
                  
                </div>
              </div>
            </div>
            <div className="card bg-dark">
              <div className="card-header" id="headingOne">
                <p className="p-0 m-0 d-inline">Tiempo</p>

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
                  
                </div>
              </div>
            </div>
            
          </div>
        </>
    )
}
