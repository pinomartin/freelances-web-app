import { withRouter, Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

const AddProjectButton = ()  => {
    return (
        <>
          <Tippy content="Nuevo Proyecto">
            <Link to={'/newproject'}
              className="addProjectButton"
              
            >
              <i className="fas fa-plus addProjectButton__icon"></i>
            </Link>
          </Tippy>
        </>
    )
}

export default withRouter (AddProjectButton)
