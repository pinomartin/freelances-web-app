import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="container">
      <div className="row mt-3 mb-3">
        <div className="col-12">
          <h2 className="text-center">Términos y Condiciones</h2>
        </div>
      </div>
      <div className="termsx">
        <p>
          Bienvenido a <strong>Freelances App</strong> proporcionado por Mantis
          Software Factory.
        </p>
        <p>
          Nos complace ofrecerle acceso al Servicio de Gestión de Proyectos,
          sujeto a estos términos y condiciones y a la Política de Privacidad
          correspondiente.
        </p>
        <p>
          Al acceder y utilizar el Servicio, usted expresa su consentimiento,
          acuerdo y entendimiento de los Términos de Servicio y la Política de
          Privacidad. Si no está de acuerdo con los Términos de Servicio o la
          Política de Privacidad, no utilice el Servicio.
        </p>
        <p>
          Si utiliza el servicio está aceptando las modalidades operativas en
          vigencia descriptas más adelante, las declara conocer y aceptar, las
          que se habiliten en el futuro y en los términos y condiciones que a
          continuación se detallan:{" "}
        </p>
        <strong>Operaciones habilitadas</strong>
        <p>
          Las operaciones habilitadas son aquellas que estarán disponibles para
          los clientes, quienes deberán cumplir los requisitos que se encuentren
          vigentes en su momento para operar el Servicio. Las mismas podrán ser
          ampliadas o restringidas por el proveedor, comunicándolo previamente
          con una antelación no menor a 60 días, y comprenden entre otras, sin
          que pueda entenderse taxativamente las que se indican a continuación:
        </p>
        <ul>
          <li>Creación de Proyectos (por hora o por presupuesto total).</li>
          <li>Carga de Tiempos y Tareas de Proyecto.</li>
          <li>Carga de gastos extras.</li>
          <li>Generación de reportes generales de usuario y por proyecto.</li>
        </ul>
        <p>
          En ningún caso debe entenderse que la solicitud de un producto o
          servicio implica obligación alguna para el Acceso y uso del Servicio.
        </p>
        <p>
          Para operar el Servicio se requerirá siempre que se trate de clientes
          de Mantis Software Factory, quienes podrán acceder mediante cualquier
          dispositivo con conexión a la Red Internet.{" "}
        </p>
        <p>
          El cliente deberá proporcionar el usuario y clave asignado, que será
          provista por la organización como requisito previo a la primera
          operación, en la forma que le sea requerida. La clave es personal y
          todo o cualquier otro mecanismo adicional de autenticación personal
          provisto por Mantis Software Factory tiene el carácter de secreto e
          intransferible, y por lo tanto asume las consecuencias de su
          divulgación a terceros, liberando a Mantis Software Factory de toda
          responsabilidad que de ello se derive.
        </p>
        <strong>Costo del Servicio.</strong>
        <p>
          Mantis Software Factory podrá cobrar comisiones por el mantenimiento
          y/o uso de este Servicio o los que en el futuro implemente,
          entendiéndose facultado expresamente para efectuar los
          correspondientes débitos en mis cuentas, aún en descubierto, por lo
          que presto para ello mi expresa conformidad. En caso de cualquier
          modificación a la presente previsión, lo comunicará con al menos 60
          días de antelación.{" "}
        </p>
        <strong>Vigencia</strong>
        <p>
          El Usuario podrá dejar sin efecto la relación que surja de la
          presente, en forma inmediata, sin otra responsabilidad que la derivada
          de los gastos originados hasta ese momento. Si el cliente incumpliera
          cualquiera de las obligaciones asumidas en su relación contractual con
          Mantis Software Factory, o de los presentes Términos y Condiciones,
          Mantis Software Factory podrá decretar la caducidad del presente
          Servicio en forma inmediata, sin que ello genere derecho a
          indemnización o compensación alguna.
        </p>
        <p>
          Mantis Software Factory podrá dejar sin efecto la relación que surja
          de la presente, con un preaviso mínimo de 60 días, sin otra
          responsabilidad.
        </p>
        <strong>Validez de operaciones y notificaciones.</strong>
        <p>
          Los registros emitidos por la app serán prueba suficiente de las
          operaciones cursadas por dicho canal.
        </p>

        <p>
          Renuncio expresamente a cuestionar la idoneidad o habilidad de ese
          medio de prueba. A los efectos del cumplimiento de disposiciones
          legales o contractuales, se otorga a las notificaciones por este medio
          el mismo alcance de las notificaciones mediante documento escrito.
        </p>
        <strong>Propiedad intelectual.</strong>
        <p>
          El software en Argentina está protegido por la ley 11.723, que regula
          la propiedad intelectual y los derechos de autor de todos aquellos
          creadores de obras artísticas, literarias y científicas.{" "}
        </p>
        <strong>Privacidad de la información.</strong>
        <p>
          Para utilizar los Servicios ofrecidos por Mantis Software Factory, los
          Usuarios deberán facilitar determinados datos de carácter personal. Su
          información personal se procesa y almacena en servidores o medios
          magnéticos que mantienen altos estándares de seguridad y protección
          tanto física como tecnológica. Para mayor información sobre la
          privacidad de los Datos Personales y casos en los que será revelada la
          información personal, se pueden consultar nuestras políticas de
          privacidad.
        </p>
      </div>
      <div className="text-center">
        <p className="lead text-center mt-2 mb-0">🎧Dudas o consultas ❓</p>

        <Link to={{ pathname: "/help" }}>
          <button className="btn btn-primary text-center">
            Necesito ayuda
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TermsConditions;
