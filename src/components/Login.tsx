import { useCallback, useState, useEffect, useContext } from "react";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";
import { auth, db, provider } from "../firebase";
import { FreelancesContext } from '../context/FreelancesProvider';
import FreelancesTextLogo from "../assets/freelancesTextLogo.svg";
import PaperPlaneLogo from "../assets/paperPlaneLogo.svg";
import GoogleLoginIcon from "../assets/googleLoginIcon.svg";

interface LoginProps extends RouteComponentProps<any> {
  firebaseUserActive?: object;
}


const Login = ({ history }: LoginProps) => {
  const { authUser } = useContext(FreelancesContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);

  useEffect(() => {
    if (authUser) {
      history.push("/projects");
    } else {
      history.push("/login");
    }
  }, [authUser, history]);

  const procesarData = (e: any) => {
    console.log(typeof e);
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingrese Email");
      return;
    }
    if (!password.trim()) {
      setError("Ingrese Contraseña");
      return;
    }
    if (password.length < 8) {
      setError("Debe Ingresar una Contraseña con 8 caracteres o más...");
      return;
    }
    console.log("Paso todas las pruebas");
    setError("");

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      console.log("***DATOS USUARIO LOGUEADO", response.user);
      setEmail("");
      setPassword("");
      setError("");

      history.push("/projects"); //Lo mandamos al Admin al loggearse
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        error.message = "Email no valido";
      }
      if (error.code === "auth/user-not-found") {
        error.message = "No existe usuario con ese Email";
      }
      if (error.code === "auth/wrong-password") {
        error.message = "Email o Contraseña no son válidos";
      }

      setError(error.message);
    }
  }, [email, password, history]);

  const loginWithGoogleAccount = async () => {
    try {
      const resp: any = await auth.signInWithPopup(provider);
      const dbUser = await db.collection("users").doc(resp.user.email).get();
      if (dbUser.exists) {
        console.log("Data Usuario desde DB", dbUser.data());
      } else {
        await db.collection("users").doc(resp.user.email).set({
          userName: resp.user.displayName,
          email: resp.user.email,
          uid: resp.user.uid,
          profilePhotoURL: resp.user.photoURL,
        });
      }
      history.push("/projects");
    } catch (error) {
      error.code === "auth/popup-closed-by-user" &&
        setError("Cerraste el popUp de Google");
    }
  };

  const registrar = useCallback(async () => {
    try {
      const response: any = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("TIPO DE Response en registro de usuario", typeof response);
      await db.collection("users").doc(response.user.email).set({
        userName: userName,
        email: response.user.email,
        uid: response.user.uid,
        profilePhotoURL: "https://firebasestorage.googleapis.com/v0/b/freelances-app.appspot.com/o/defaultProfilePhoto.png?alt=media&token=e99ffccf-b9bd-41c8-b55a-92e2a0103dea",
      });
      //Reset de los campos del formulario
      setEmail("");
      setPassword("");
      setError("");

      history.push("/projects");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        error.message = "Email no valido"; //Para traducir el error de Firebase
      }
      if (error.code === "auth/email-already-in-use") {
        error.message = "Email en uso";
      }

      setError(error.message);
    }
  }, [email, password, userName, history]); //es necesario insertar los campos que van como parametros en la funcion

  return (
    <>
    <div className="navbar navbar-dark bg-dark sticky-top">
      <NavLink className="navbar-brand NavBar__navBarBrand" to="/" exact>
        <img src={FreelancesTextLogo} alt="MainAppLogo" width="100" />
        <img src={PaperPlaneLogo} alt="MainAppLogo" width="30" />
      </NavLink>
      </div>
    <div className="container-fluid">
    
      <hr />
      <hr />
      <hr />
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de Usuarios" : "Inicio de Sesion"}
      </h3>
      <hr />
      <div className="row justify-content-center m-0">
        <div className="col-9 col-sm-8 col-md-6 col-xl-3">
          <form onSubmit={procesarData}>
            {error && <div className="alert alert-danger">{error}</div>}
            {esRegistro ? (
              <input
                type="text"
                className="form-control form-control-sm mb-2 customForm__input"
                placeholder="Nombre de Usuario"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            ) : null}

            <input
              type="email"
              className="form-control form-control-sm mb-2 customForm__input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              className="form-control form-control-sm mb-3 customForm__input"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button className="btn btn-primary btn-lg btn-block" type="submit">
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>

            <button
              className="btn btn-info btn-sm btn-block mb-2"
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {esRegistro ? "¿Ya tienes Cuenta?" : "¿No estas Registrado?"}
            </button>
          </form>
          <button
            className="btn btn-outline-light btn-sm btn-block mt-5"
            onClick={loginWithGoogleAccount}
          >
            <img src={GoogleLoginIcon} alt="" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
    </div>
    
    </>
  );
};

export default withRouter(Login);
