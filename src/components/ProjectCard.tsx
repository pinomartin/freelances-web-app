import React from "react";

type Props = {
  data: any;
};

export const ProjectCard = ({ data: projectData }: Props) => {
  const {nombre, } = projectData;

  return (
    <>
      <div className="col-12 col-sm-6 col-lg-4 mb-3 mt-3">
        <div className="card projectListItem__card" onClick={()=> {}}>
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <small>
              Cliente {}
            </small>
            <a href="https://google.com" className="card-link">
              Another link
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
