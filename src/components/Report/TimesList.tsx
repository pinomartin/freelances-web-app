import { ReportTimeList } from "../../interfaces/reportTimeList";
import { TimeListItem } from "./TimeListItem";

const TimesList = ({
  tasks,
  projectData,
  projectUID,
  title,
  isClientMode
}: ReportTimeList) => {

  console.log(isClientMode);
  return tasks.length !== 0 ? (
    <>
      <h4 className="text-center primaryFontColor">{title}</h4>
      <div className="">
        <table className="table table-striped table-borderless table-dark rounded ">
          <tbody>
            {tasks.length !== 0
              ? tasks.map((item: any) => (
                  <>
                    <TimeListItem
                      task={item}
                      key={item.id}
                      projectData={projectData}
                      isClientMode={isClientMode}
                    />
                  </>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    null
  );
};

export default TimesList;
