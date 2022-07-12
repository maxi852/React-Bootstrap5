import React, {useContext} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';

function NavBar(){

    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);

    const logout = (event) => {
      event.preventDefault();
      localStorage.clear();
      dispatch({type: 'LOGOUT'})
      navigate('/login');
    }

    const dynamicMenu = () => {
      if(state){//user is already logged in can access to create
        return[
          <li key='990' className="nav-item">
            <NavLink className="nav-link text-white" to="/myposts">My Posts</NavLink>
          </li>,
          <li key='989' className="nav-item">
            <NavLink className="nav-link text-white" to="/create">Create Post</NavLink>
          </li>
        ]
      }
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-primary bg-gradient ">
  <div className="container-fluid">
    <NavLink className="navbar-brand text-white" to="/">My app</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li key='988' className="nav-item">
            <NavLink className="nav-link text-white" to="/">Home</NavLink>
          </li>
          <li key='987' className="nav-item">
            <NavLink className="nav-link text-white" to="/posts">Posts</NavLink>
          </li>
          <li key='986' className="nav-item">
            <NavLink className="nav-link text-white" aria-current="page" to="/about">About us</NavLink>
          </li>
          <li key='985' className="nav-item">
            <NavLink className="nav-link text-white" to="/contact">Contact</NavLink>
          </li>
        {dynamicMenu()}
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-primary" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        {state ? <button onClick={(event)=>logout(event)} className="btn btn-danger" type="submit">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
        :<>
        <NavLink to='/login' className="btn btn-primary">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </NavLink>
        <NavLink to='signup' className="btn btn-primary">
          <i className="fa-solid fa-user-plus"></i>
        </NavLink>
        </>
        }
      </form>
    </div>
  </div>
</nav>
        </div>
    )
}

export default NavBar;