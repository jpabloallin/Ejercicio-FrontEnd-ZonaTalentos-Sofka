import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import PokemonDashboard from "../pages/dashboard/PokemonDashboard";
import Main from "../pages/main/Main";

interface IProps {
}

const AppRoutes:React.FC<IProps> = () => {

    return <BrowserRouter>
        <NavBar/>
        <nav className="navbar navbar-dark bg-light d-flex justify-content-around p-1">
            <Link to="/" className="link-dark btn btn-secondary btn-lg active p-2">Main page</Link>
            <Link to="/pokemon" className="btn btn-secondary btn-lg active p-2">Pokémon</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/about" element={<PokemonDashboard/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
}

export default AppRoutes