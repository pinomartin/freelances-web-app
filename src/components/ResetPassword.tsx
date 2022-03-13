import { useCallback, useState } from "react";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import FreelancesTextLogo from "../assets/freelancesTextLogo.svg";
import PaperPlaneLogo from "../assets/paperPlaneLogo.svg";

interface LoginProps extends RouteComponentProps<any> {
  firebaseUserActive?: object;
}

const ResetPassword = ({ history }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const procesarData = (e: any) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Debes ingresar un email");
      return;
    }

    setError("");
    sendPasswordResetEmail();
  };

  const showToast = useCallback(() => {
    toast.dark("🚀 Correo enviado exitosamente ! ", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => history.push("login"),
    });
  }, [history]);

  const sendPasswordResetEmail = useCallback(
    async () => {
      try {
        await auth.sendPasswordResetEmail(email);
        setEmail("");
        setError("");
        showToast();
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email, showToast]
  );

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
        <div className="mt-3">
          <h3 className="text-center">Recuperación de Contraseña</h3>
          <p className="text-center">
            Se enviará un correo a la dirección indicada
          </p>
          <hr />
          <div className="row justify-content-center m-0">
            <div className="col-9 col-sm-8 col-md-6 col-xl-3">
              <form onSubmit={procesarData}>
                {error && (
                  <div className="alert alert-info text-center pt-2 pb-2">
                    {error}
                  </div>
                )}

                <input
                  type="email"
                  className="form-control form-control-sm mt-4 mb-2 customForm__input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Confirmar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ResetPassword);
