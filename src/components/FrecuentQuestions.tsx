const FrecuentQuestions = () => {
  return (
    <>
      <div className="overflow-auto accordion__container__scrollbar border-0">
        <div className="accordion" id="accordionExample">
          <div className="card border-0">
            <div className="card-header" id="headingOne">
              <p className="p-0 m-0 d-inline primaryFontColor">
                <span>Como creo un proyecto ? </span>
              </p>

              <button
                className="btn btn-primary float-right"
                type="button"
                data-toggle="collapse"
                data-target={`#collapseOne`}
                aria-expanded="true"
                aria-controls={`collapseOne`}
              >
                <i className="fas fa-info-circle"></i>
              </button>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body bg-dark">
                Cuando crees tu cuenta solo tienes que pulsar sobre el boton <strong>+</strong> en el margen inferior de la pantalla y comenzar a definir los datos iniciales del proyecto. 
              </div>
            </div>
          </div>
          <div className="card border-0">
            <div className="card-header" id="headingTwo">
              <p className="p-0 m-0 d-inline primaryFontColor">
                <span>Tiene un costo el uso del servicio? </span>
              </p>

              <button
                className="btn btn-primary float-right"
                type="button"
                data-toggle="collapse"
                data-target={`#collapseTwo`}
                aria-expanded="true"
                aria-controls={`collapseTwo`}
              >
                <i className="fas fa-info-circle"></i>
              </button>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div className="card-body bg-dark">
                El servicio es gratuito y lo será siempre ! 
              </div>
            </div>
          </div>
          <div className="card border-0">
            <div className="card-header" id="headingThree">
            <p className="p-0 m-0 d-inline primaryFontColor">
                <span>Tiene un costo el uso del servicio? </span>
              </p>

              <button
                className="btn btn-primary float-right"
                type="button"
                data-toggle="collapse"
                data-target={`#collapseThree`}
                aria-expanded="true"
                aria-controls={`collapseThree`}
              >
                <i className="fas fa-info-circle"></i>
              </button>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                And lastly, the placeholder content for the third and final
                accordion panel. This panel is hidden by default.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrecuentQuestions;
