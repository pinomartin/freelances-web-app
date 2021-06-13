import Tippy from "@tippyjs/react";


const PrintPDFButton = () => {
    return (
        <>
          <Tippy content="Guardar como PDF">
            <button
              className="reportButton"
            >
              <i className="fas fa-save reportButton__icon"></i>
            </button>
          </Tippy>
        </>
    )
}

export default PrintPDFButton
