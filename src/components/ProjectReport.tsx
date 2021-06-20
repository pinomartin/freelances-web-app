import { useRef, useState } from "react";
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
  const [clientMode, setClientMode] = useState(false);
  const [isCheckedSwowEstimatedTotal, setIsCheckedSwowEstimatedTotal] =
    useState(false);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle:`
    @media all {
      .pagebreak{
        display: none;
      }
    }`
  });

  // const handleChangeEstimatedTotal = () => {
  //   setIsCheckedSwowEstimatedTotal(!isCheckedSwowEstimatedTotal);
  // };

  return (
    <div className="container bg-dark mt-4 mb-4">
      
      <div className="row  justify-content-between align-items-center">
        <div className="col-6">
          <button
            className="btn btn-block btn-primary"
            onClick={() => {
              setClientMode(false);
            }}
          >
            Modo Personal
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-block btn-info"
            onClick={() => setClientMode(true)}
          >
            Modo Cliente
          </button>
        </div>
      </div>
      {clientMode ? (
        <div className="row">
          <div className="col-12 bg-dark">
            <label>
              <input type="checkbox" className="report__checkboxInput" checked={isCheckedSwowEstimatedTotal} onChange={(e:any)=> setIsCheckedSwowEstimatedTotal(e.target.checked)}/>
              Total Real
            </label>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 pt-2 pb-2"></div>
        </div>
      )}
      <br />
      
      <div className="report__mainContainerPrintable bg-dark" ref={printRef}>
        <Header />
        <ProjectSection data={projectData} />
        <div className="row align-items-center justify-content-end bg-dark">
          <div className="col-7 col-md-7">
            <TimesList
              tasks={tasks}
              title={"Tiempos"}
              projectData={projectData}
              projectUID={projectUID}
              isClientMode={clientMode}
            />
          </div>
          <div className="col-5 col-md-5 pl-1 pr-1">
            <ExpensesReportList expenses={expenses} />
          </div>
        </div>
        <div className="row align-items-end justify-content-start">
          <div className="col-12 p-0 ">
            <AmountsResume
              projectData={projectData}
              tasks={tasks}
              expenses={expenses}
            />
          </div>
        </div>
        <div className="row bg-dark">
          <div className="col-12 text-center">
            <Footer
              primaryLabel={"Freelances App - Todos los derechos reservados."}
            />
          </div>
        </div>
      </div>
      <PrintPDFButton handlePrint={handlePrint} />
    </div>
  );
};

export default withRouter(ProjectReport);
