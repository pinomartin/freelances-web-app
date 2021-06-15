import {
    Link,
  } from "react-router-dom";

  
const Footer = () => {
    return (
        <footer className="bg-dark footer">
            <div className="row no-gutters">
                <div className="col-12">
                  <Link to='/terms' className='link'>Terminos y Condiciones</Link>  
                </div>
            </div>
        </footer>
    )
}

export default Footer;
