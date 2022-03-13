import { useState } from "react";
import { addQuestionHelpToDB } from "../firebaseUtils/setFirestoreData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FrecuentQuestions from "./FrecuentQuestionsList";

toast.configure();

const Help = () => {

  const initialFormData = {
    name: "",
    email: "",
    question: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const showToast = () => {
    toast.dark("🚀 Recibimos tu consulta ! ", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const procesarData = (e: any) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Ingresa tu nombre");
      return;
    }
    if (!formData.email.trim()) {
      setError("Ingresa un correo para comunicarnos contigo");
      return;
    }
    if (!formData.question.trim()) {
      setError("Ingresa tu pregunta o consulta");
      return;
    }
    setError("");
    addQuestionHelpToDB(formData).then(showToast);
    setFormData(initialFormData);
  };

  return (
    <div className="container mt-2 mt-md-5">
      <div className="row no-gutters justify-content-between align-items-center">
        <div className="col-12 col-md-6 pb-4">
          <h4 className="mb-2 mb-md-5  text-center">Preguntas Frecuentes</h4>
          <FrecuentQuestions />
        </div>
        <div className="col-12 col-md-4 text-center mb-2">
          <h4>No encontraste lo que buscabas? </h4>
          <p>
            Completá el formulario y nos pondremos en contacto contigo a la
            brevedad.
          </p>
          <div className="row no-gutters justify-content-center">
            <div className="col-12">
              {error && <div className="alert alert-info text-center pt-2 pb-2">{error}</div>}
              <form onSubmit={(e) => procesarData(e)}>
                <div className="input-group mt-1 mt-md-3">
                  {/* <span className="input-group-addon p-1 primaryFontColor">
                    Tu Nombre
                  </span> */}
                  <input
                    placeholder="Tu Nombre"
                    type="text"
                    className="form-control form-control-sm mb-2 customForm__input"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    value={formData.name}
                  />
                </div>
                <div className="input-group mt-1">
                  <input
                    placeholder="Dirección de E-mail"
                    type="email"
                    className="form-control form-control-sm mb-2 customForm__input"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    value={formData.email}
                  />
                </div>
                <textarea
                  className="form-control form-control-sm mb-2 customForm__input"
                  placeholder="Cuál es tu problema o consulta?"
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  value={formData.question}
                />
                <button className="btn btn-primary btn-block" type="submit">
                  Enviar!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
