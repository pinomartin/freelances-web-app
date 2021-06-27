import MainLogo from "../assets/mainLogoTransparent.svg";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-dark">
        <div className="container">
          <div className="mt-5 text-center">
            <img src={MainLogo} alt="" className="img-fluid" />
            <hr />
            <h3 className="text-white">
              {"Bienvenido a una nueva forma de trabajo Freelance"}
            </h3>
          </div>
        </div>
      <Footer />
      </div>
    </>
  );
};

export default Home;
