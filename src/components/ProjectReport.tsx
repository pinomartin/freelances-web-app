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
import FinishProjectButton from "./Report/FinishProjectButton";

const ProjectReport = () => {
  const location = useLocation();
  const { tasks, expenses, projectData, projectUID, user }: any =
    location.state;
  console.log(user);
  const printRef = useRef<HTMLDivElement>(null);
  const [clientMode, setClientMode] = useState(false);

  const [isShowRealTotal, setIsShowRealTotal] = useState(false);
  const [isShowTimes, setIsShowTimes] = useState(true);
  const [isShowPriceTimes, setisShowPriceTimes] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
    @media all {
      .pagebreak{
        display: none;
      }
    }`,
  });
  console.log(projectData);

  // const handleChangeEstimatedTotal = () => {
  //   setIsCheckedSwowEstimatedTotal(!isCheckedSwowEstimatedTotal);
  // };

  return (
    <>
      <div className="row justify-content-center align-items-center bg-transparent no-gutters mt-2">
        <div className="col-5 col-sm-2 p-md-0">
          <button
            className="btn btn-block btn-primary"
            onClick={() => {
              setClientMode(false);
              setIsShowTimes(true);
              setisShowPriceTimes(true);
              setIsShowRealTotal(false);
            }}
          >
            Modo Personal
          </button>
        </div>
        <div className="col-5 col-sm-2 bg-transparent p-md-0">
          <button
            className="btn btn-block btn-secondary"
            onClick={() => setClientMode(true)}
          >
            Modo Cliente
          </button>
        </div>
      </div>
      {clientMode ? (
        <div className="row justify-content-between no-gutters align-items-center mt-2">
          <div className="col-4  text-center">
            <label>
              <input
                type="checkbox"
                className="report__checkboxInput"
                checked={isShowPriceTimes}
                onChange={(e: any) => setisShowPriceTimes(e.target.checked)}
              />
              Precio de Tareas
            </label>
          </div>
          <div className="col-4  text-center">
            <label>
              <input
                type="checkbox"
                className="report__checkboxInput"
                checked={isShowRealTotal}
                onChange={(e: any) => setIsShowRealTotal(e.target.checked)}
              />
              Cobrar estimado
            </label>
          </div>

          <div className="col-4  text-center">
            <label>
              <input
                type="checkbox"
                className="report__checkboxInput"
                checked={isShowTimes}
                onChange={(e: any) => setIsShowTimes(e.target.checked)}
              />
              Tiempos de Tareas
            </label>
          </div>
        </div>
      ) : (
        <div className="row no-gutters">
          <div className="col-12 pt-2 pb-2"></div>
        </div>
      )}
      <div className="container bg-dark mt-4 mb-4">
        <br />

        <div className="report__mainContainerPrintable bg-dark" ref={printRef}>
          <Header />

          <ProjectSection data={projectData} />
          <br />
          <div className="row justify-content-between bg-dark">
            <div className="col-7 col-md-7 mt-1">
              <TimesList
                tasks={tasks}
                title={"Tareas"}
                projectData={projectData}
                projectUID={projectUID}
                isShowPriceTimes={isShowPriceTimes}
                isShowTimes={isShowTimes}
                isShowRealTotal={isShowRealTotal}
              />
            </div>
            <div className="col-5 col-md-5 mt-1 report__rightColumn">
                <ExpensesReportList expenses={expenses} />

                <AmountsResume
                  projectData={projectData}
                  tasks={tasks}
                  expenses={expenses}
                  isClientMode={clientMode}
                  isShowPriceTimes={isShowPriceTimes}
                  isShowTimes={isShowTimes}
                  isShowRealTotal={isShowRealTotal}
                />
            </div>
          </div>

          {/* <div className="row align-items-end justify-content-start">
            <div className="col-12 p-0 ">
              <AmountsResume
                projectData={projectData}
                tasks={tasks}
                expenses={expenses}
                isClientMode={clientMode}
                isShowPriceTimes={isShowPriceTimes}
                isShowTimes={isShowTimes}
                isShowRealTotal={isShowRealTotal}
              />
            </div>
          </div> */}
          {user ? (
            <div className="row align-items-center justify-content-end bg-dark">
              <div className="col-12 p-0 text-center">
                <p className="p-0 m-0">
                  Proyecto desarrollado por{" "}
                  <strong className="secondaryFontColor">
                    {user.userName}
                  </strong>
                </p>
              </div>
            </div>
          ) : null}
          <div className="row bg-dark pt-2">
            <div className="col-12 text-center">
              <Footer
                primaryLabel={"Freelances App - Todos los derechos reservados."}
              />
            </div>
          </div>
        </div>
        {projectData.isDone === false && (
          <FinishProjectButton projectUID={projectUID} />
        )}
        <PrintPDFButton handlePrint={handlePrint} />
      </div>
    </>
  );
};

export default withRouter(ProjectReport);
