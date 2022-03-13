import { QuestionProps } from "../interfaces/question";

const FrecuentQuestionListItem = ({ question }: QuestionProps) => {
  return (
    <>
      <div className="card bg-dark">
        <div className="card-header" id="headingOne">
          <p className="p-0 m-0 d-inline primaryFontColor">
            {question.question}
          </p>

          <button
            className="btn btn-primary float-right"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${question.id}`}
            aria-expanded="true"
            aria-controls={`collapse${question.id}`}
          >
            <i className="fas fa-info-circle"></i>
          </button>
        </div>

        <div
          id={`collapse${question.id}`}
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#questionAccordion"
        >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-12">
                <p className="m-0">{question.answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrecuentQuestionListItem;
