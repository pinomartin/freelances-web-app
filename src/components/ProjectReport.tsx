import { useRef } from "react";
import { withRouter, useLocation } from "react-router-dom";
import ExpensesReportList from "./Report/ExpensesReportList";
import Header from "./Report/Header";
import PrintPDFButton from "./Report/PrintPDFButton";
import ProjectSection from "./Report/ProjectSection";
import TimesList from "./Report/TimesList";
import { useReactToPrint } from 'react-to-print';

const ProjectReport = () => {
  const location = useLocation();
  const { tasks, expenses ,projectData, projectUID }: any = location.state;
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="container bg-white mt-2 mb-2">
    <div ref={printRef}>
    <Header />
    <ProjectSection data={projectData} />
      <div className="row">
        <div className="col-7">
          <TimesList tasks={tasks} title={'Tiempos'} projectData={projectData} projectUID={projectUID}/>
        </div>
        <div className="col-5">
          <ExpensesReportList expenses={expenses} />
        </div>
      </div>
      </div>
      <PrintPDFButton handlePrint={handlePrint}/>
    </div>
  );
};

export default withRouter(ProjectReport);
