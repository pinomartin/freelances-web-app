import React from 'react'
import NewProjectForm from './NewProjectForm'

const AddProjectButton = () => {
    return (
        <>
            <button
              className="addProjectButton"
              onClick={ () =>  NewProjectForm }
            >
              <i className="fas fa-plus addProjectButton__icon"></i>
            </button>
        </>
    )
}

export default AddProjectButton
