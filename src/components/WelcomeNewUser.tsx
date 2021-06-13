import Upps from "../assets/uuups.svg";

const WelcomeNewUser = () => {
  return (
    <>
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-8">
          <img src={Upps} alt="" className="img-fluid" />
        </div>
        <div className="col-8 col-md-4 ">
          <h2 className="text-center">Ups ! <br /> Aun no tienes proyectos</h2>
          <br />
          <p className="text-center">Comienza creando uno nuevo </p>
        </div>
      </div>
    </>
  );
};

export default WelcomeNewUser;
