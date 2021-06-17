import Tippy from "@tippyjs/react";


const PrintPDFButton = (props:any )=> {
  const {handlePrint} = props;

  console.log(props);
    return (
        <>
          <Tippy content="Guardar como PDF">
            <button
              className="reportButton"
              onClick={handlePrint}
            >
              <i className="fas fa-save reportButton__icon"></i>
            </button>
          </Tippy>
        </>
    )
}

export default PrintPDFButton
