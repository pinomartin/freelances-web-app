import Tippy from "@tippyjs/react";


const PrintPDFButton = (props:any )=> {
  const {handlePrint} = props;

    return (
        <>
          <Tippy content="Guardar como PDF">
            <button
              className="reportButton__PDF"
              onClick={handlePrint}
            >
              <i className="fas fa-save reportButton__icon"></i>
            </button>
          </Tippy>
        </>
    )
}

export default PrintPDFButton
