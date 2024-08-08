import React from 'react';
import Logo from "../Logotip/Logo";
import s from "./Navigation.module.css"
import {NavLink} from "react-router-dom";


const Navigation = () => {
    return (
        <nav>
            <Logo/>

            <div className={s.Nav__Links}>

                <NavLink to={'/'}>Text</NavLink>
                <NavLink to={'/Home'}>Text</NavLink>
                <NavLink to={'/'}>Text</NavLink>
                <NavLink to={'/'}>Text</NavLink>
                <NavLink to={'/'}>Text</NavLink>
                <NavLink to={'/'}>Text</NavLink>
            </div>

            <div className={s.Nav__Contacts}>
                <h3>Главный программист :<a href="tel:+79190373958">+7-919-037-39-58</a></h3>
                <h3>Главный программист :<a href="tel:+79190373958">+7-919-037-39-58</a></h3>
            </div>
        </nav>
    );
};

export default Navigation;