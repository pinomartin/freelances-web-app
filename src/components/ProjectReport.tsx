import { useRef } from "react";
import { withRouter, useLocation } from "react-router-dom";
import ExpensesReportList from "./Report/ExpensesReportList";
import Header from "./Report/Header";
import PrintPDFButton from "./Report/PrintPDFButton";
import ProjectSection from "./Report/ProjectSection";
import TimesList from "./Report/TimesList";
import { useReactToPrint } from "react-to-print";
import AmountsResume from "./Report/AmountsResume";
import Footer from "./Report/Footer";

const ProjectReport = () => {
  const location = useLocation();
  const { tasks, expenses, projectData, projectUID }: any = location.state;
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="container bg-white mt-4 mb-4">
      <div ref={printRef}>
        <Header />
        <ProjectSection data={projectData} />
        <div className="row align-items-center justify-content-end bg-dark">
          <div className="col-7 col-md-7">
            <TimesList
              tasks={tasks}
              title={"Tiempos"}
              projectData={projectData}
              projectUID={projectUID}
            />
          </div>
          <div className="col-5 col-md-5 pl-1 pr-1">
            <ExpensesReportList expenses={expenses} />
           
          </div>
        </div>
        <div className="row align-items-end justify-content-start">
          <div className="col-7 ">
          <AmountsResume
              projectData={projectData}
              tasks={tasks}
              expenses={expenses}
            />
          </div>
        </div>
        <div className="row bg-dark">
          <div className="col-12 text-center">
            <Footer primaryLabel={'Freelances App - Todos los derechos reservados.'}/>
          </div>
        </div>
      </div>
      <PrintPDFButton handlePrint={handlePrint} />
    </div>
  );
};

export default withRouter(ProjectReport);
