import React from 'react'
import { useParams, withRouter } from 'react-router-dom';

const ProjectScreen = () => {
let params = useParams();

    return (
        <div>
            <h4>

            Hola Soy id {params}
            </h4>
        </div>
    )
}

export default withRouter(ProjectScreen)
