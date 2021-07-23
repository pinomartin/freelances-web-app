import { useLocation } from "react-router-dom";

const ProjectDataDetails = () => {
    const location = useLocation();
    const { tasks, project }: any = location.state;
    console.log(tasks, project)
    return (
        <div className="container">
      <h3 className="text-center mt-3">Mis estadísticas</h3>
      <div className="row justify-content-center align-items-center mt-4">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-4 col-md-2">
              {/* <Select
                options={months}
                placeholder="Selecciona el Mes"
                theme={customTheme}
                styles={customStyles()}
                isSearchable={true}
                onChange={setMonth}
                noOptionsMessage={() => "Mes inválido"}
                defaultValue={month}
              /> */}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row no-gutters justify-content-center">
            <div className="col-9 pt-2 pb-3">
              {/* <BarChart
                data={daysChartData.data}
                labels={daysChartData.labels}
                subLabel={"Horas"}
                title={`Horas por día por mes`}
                xLabel={"Dias"}
                yLabel={"Horas"}
              /> */}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row no-gutters justify-content-center">
            <div className="col-9 pt-2 pb-3">
              {/* <LineChart
                data={weeksChartData.data}
                labels={weeksChartData.labels}
                subLabel={"Horas"}
                title={`Horas por semana por mes`}
                xLabel={"Semanas"}
                yLabel={"Horas"}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ProjectDataDetails
