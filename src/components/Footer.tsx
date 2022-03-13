import {
    Link,
  } from "react-router-dom";
import TextLogo from "../assets/freelancesTextLogo.png";


  
const Footer = () => {
    return (
        
  <footer id="footer">

    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-6 col-md-6 footer-contact">
          <img src={TextLogo} className="img-fluid" alt="TextLogo" width={'100px'}/>
            <p>
            Córdoba, 
              Argentina<br/>
              2021<br/>
              
            </p>
          </div>

        

          <div className="col-lg-6 col-md-6 text-center">
            <p>Consulta la sección de  <Link to="/terms">Términos y condiciones</Link> </p>
            
            <p className="p-0 m-0">Tienes algún problema ?</p>
            <Link to="/help" className="btn btn-primary">Necesito ayuda!</Link>
            <br />
            <br />
          </div>

          
        </div>
      </div>
    </div>

    <div className="container">

      <div className="copyright-wrap d-md-flex py-4">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            &copy; <strong><span>Freelances App</span></strong>. Todos los derechos reservados.
          </div>
          <div className="credits">
           Desarrollado por Mantis Software Factory.
          </div>
        </div>
      </div>

    </div>
  </footer>

  
    )
}

export default Footer;
