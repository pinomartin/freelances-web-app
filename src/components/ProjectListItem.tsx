import React from 'react'

type Props = {
  data:any
}

export const ProjectListItem = ({data}:Props) => {
    console.log(data);

    return (
        <>
            <div
              
              className="list-group-item list-group-item-action active"
              aria-current="true"
            >
              <p style={{ display: "inline" }}>{data.nombre}</p>
              <button style={{ float:'right' }}>Hola</button>
            </div>
        </>
    )
}
