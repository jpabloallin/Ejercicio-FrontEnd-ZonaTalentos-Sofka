import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import AuthenticatorPage from "../pages/authentication/AuthenticationPage";
import Main from "../pages/main/Main";
import SingularPokemon from "../pages/pokemon/SingularPokemon";

interface IProps {
}

const AppRoutes:React.FC<IProps> = () => {

    return <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/login" element={<AuthenticatorPage/>} />
            <Route path="/" element={<Main/>} />
            <Route path="/pokemon/:name" element={<SingularPokemon/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
}

export default AppRoutes