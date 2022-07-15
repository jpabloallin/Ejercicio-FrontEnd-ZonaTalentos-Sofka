import { useSelector } from 'react-redux'
import '../../App.css'
import { RootState } from '../../app/store'
import LogOut from '../authentication/LogOut'
const NavBar = () => {

  const{user} = useSelector((state:RootState) => state.logged)

  return (<>
    {user!==null? 
      <nav className="navbar navbar-dark bg-dark fw-bold fs-1  bg-dark p-3 text-white">
      <span className="navbar-brand mx-auto d-flex justify-content-center">
        <p className="mx-3 mt-2">Welcome to my Pokemon React App</p>  
        <img src="https://img.icons8.com/plasticine/50/000000/open-pokeball.png"/>
      </span>
      <span className="navbar-brand ">
        <p className="h6 mt-3">By Juan Pablo Allin Cañas</p> 
      </span>
      <span><LogOut/></span>
    </nav>:
    <nav className="navbar navbar-dark bg-dark fw-bold fs-1  bg-dark p-3 text-white">
      <span className="navbar-brand mx-auto d-flex justify-content-center">
        <p className="mx-3 mt-2">Welcome to my Pokemon React App</p>  
        <img src="https://img.icons8.com/plasticine/50/000000/open-pokeball.png"/>
      </span>
    </nav>
    }
    </>
  )
}

export default NavBar