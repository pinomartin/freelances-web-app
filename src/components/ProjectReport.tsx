import { withRouter, useLocation } from "react-router-dom";
import Header from "./Report/Header";
import PrintPDFButton from "./Report/PrintPDFButton";
import ProjectSection from "./Report/ProjectSection";
import TimesList from "./Report/TimesList";

const ProjectReport = () => {
  const location = useLocation();
  const { tasks, projectData, projectUID }: any = location.state;

  return (
    <div className="container bg-white mt-2 mb-2">
      <>
    <Header />
    <ProjectSection data={projectData}/>
      <div className="row">
        <div className="col-7">
          <TimesList tasks={tasks} title={'Detalle'} projectData={projectData} projectUID={projectUID}/>
          {/* <TasksList
            title={"Detalle"}
            projectUID={projectUID}
            projectData={projectData}
            clientUID={projectData?.userId}
            tasks={tasks}
          /> */}
        </div>
        <div className="col-5">
          
        </div>
      </div>
      <PrintPDFButton />
      </>
    </div>
  );
};

export default withRouter(ProjectReport);
