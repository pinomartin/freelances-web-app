import { Link } from "react-router-dom";
import TextLogo from "../assets/freelancesTextLogo.png";
import PlaneIcon from "../assets/paperPlaneLogo.svg";
import FeaturesIcon from "../assets/features.svg";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Bienvenido a la nueva forma de trabajo Freelance</h1>
              <h2>
                Un gusto poder ayudarte en tu camino profesional
              </h2>
              <div>
                <Link to="/login" className="btn-primary btn-get-started scrollto">
                Comenzar
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <img src={TextLogo} className="img-fluid animated" alt="TextLogo"/>
              <img src={PlaneIcon} className="img-fluid animated2 home__planeLogo" alt="PlaneLogo"/>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
      <div className="container">

        <div className="section-title">
          <h2>Funcionalidades</h2>
          <p>En Freelances podrás concentrarte más en tu trabajo ya que te ayudará a estimar los tiempos y costos de tus proyectos.</p>
        </div>

        <div className="row">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-lg-center">
            <div className="icon-box mt-5 mt-lg-0">
            <i className="fas fa-suitcase home__featuresIcon"></i>
              <h4>Creacion y administracion de Proyectos</h4>
              <p>Crea, estima por tiempo o presupuesto total y comienza a desarrollar tus proyectos.</p>
            </div>
            <div className="icon-box mt-5" >
            <i className="far fa-clock home__featuresIcon"></i>
              <h4>Controla tiempos en tus tareas</h4>
              <p>Con el contador de tiempos podras tener el control de todas tus actividades.</p>
            </div>
            <div className="icon-box mt-5">
            <i className="fas fa-file-invoice-dollar home__featuresIcon"></i>
              <h4>Informes completos y detallados</h4>
              <p>Obten reportes que te serviran para evaluar tu desempeno en proyectos. Asi como tambien para enviar a tus clientes y poder cobrar por tus trabajos.</p>
            </div>
            <div className="icon-box mt-5">
            <i className="fas fa-key home__featuresIcon"></i>
              <h4>Seguridad y privacidad garantizada</h4>
              <p>Tu cuenta y tus datos son privados y nadie mas puede acceder excepto tu.</p>
            </div>
          </div>
          <div className="image col-lg-6 order-1 order-lg-2 ">
            <img src={FeaturesIcon} alt="" className="img-fluid"/>
          </div>
        </div>

      </div>
    </section>
    <section id="counts" className="counts">
      <div className="container-fluid">

        <div className="row counters">

          <div className="col-lg-4 col-6 text-center">
            <span data-toggle="counter-up">50</span>
            <p>Proyectos</p>
          </div>

          <div className="col-lg-4 col-6 text-center">
            <span data-toggle="counter-up">250</span>
            <p>Horas de Trabajo</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span data-toggle="counter-up">8</span>
            <p>Freelancers trabajando</p>
          </div>

        </div>

      </div>
    </section>
    <Footer />
    <a href="#hero"className="back-to-top btn btn-primary"><i className="fas fa-arrow-up"></i></a>
    </>
  );
};

export default Home;
