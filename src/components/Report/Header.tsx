import MainLogo from "../../assets/mainLogoTransparent.svg";

const Header = () => {
    return (
        <div className="row bg-dark justify-content-end">
            <div className="col-2 mb-2 mt-2 text-center align-items-center">
                <img src={MainLogo} alt="logo" className="img-fluid bg-dark rounded" />
            </div>
        </div>
    )
}

export default Header
