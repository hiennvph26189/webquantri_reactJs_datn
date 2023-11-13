import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
const Nav = (props) => {
    const [isShow, setIsShow] = useState(true)
    let location = useLocation();
    useEffect(() => {
        if (location.pathname == '/login') {
            setIsShow(false)
        }
    },[])


    return (
        <>
       {isShow == true &&  
            <div className="topnav"> 
            <NavLink  to='/' exact>HOME</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink  to='/products'>Products</NavLink>
            <NavLink  to='/category'>Category</NavLink>
        </div>
       } 
       
        </>
        
    );
}

export default Nav;