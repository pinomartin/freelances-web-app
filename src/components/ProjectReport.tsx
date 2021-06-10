import {  withRouter, useLocation} from "react-router-dom";
import { TasksList } from "./TasksList";


const ProjectReport = () => {

    const location = useLocation()
    const {tasks, projectData, projectUID}:any= location.state

    return (
        <div>
           <TasksList
                    projectUID={projectUID}
                    projectData={projectData}
                    clientUID={projectData?.userId}
                    tasks={tasks}
                  />
        </div>
    )
}

export default withRouter(ProjectReport);