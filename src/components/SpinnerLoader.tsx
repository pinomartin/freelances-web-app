import LoaderPlane from '../assets/loaderPlane.svg'
const SpinnerLoader = () => {

  return (
    
      <div className="spinnerLoader__container">
        <img src={LoaderPlane} alt="" className="spinnerLoader__rotate"/>
      </div>
    
  );
};

export default SpinnerLoader;
