import Configuration from "../Footer/Configuration/Configuration"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import HeaderMobile from "../Header/HeaderMobile"
import "./Structure.scss"

const Structure = ({ children }) => {

    return (
        <div className='structure-del-main'>

            <Header />
            <HeaderMobile />

            <main className="contenedor">
                <div className="desarrollo">
                    {children}
                </div>
            </main>

        </div>
    )
}

export default Structure