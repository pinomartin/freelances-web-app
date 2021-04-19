import React from 'react'
import { withRouter, Link } from "react-router-dom";

const AddProjectButton = ()  => {
    return (
        <>
            <Link to={'/newproject'}
              className="addProjectButton"
              
            >
              <i className="fas fa-plus addProjectButton__icon"></i>
            </Link>
        </>
    )
}

export default withRouter (AddProjectButton)
