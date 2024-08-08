import React from 'react';
import Logo from "../Logotip/Logo";
import s from "./Navigation.module.css"


const Navigation = () => {
    return (
        <nav>
            <Logo/>

            <div className={s.Nav__Links}>

                <a href="">Text</a>
                <a href="">Text</a>
                <a href="">Text</a>
                <a href="">Text</a>
                <a href="">Text</a>
                <a href="">Text</a>
            </div>

            <div className={s.Nav__Contacts}>
                <h3>Главный программист :<a href="tel:+79190373958">+7-919-037-39-58</a></h3>
                <h3>Главный программист :<a href="tel:+79190373958">+7-919-037-39-58</a></h3>
            </div>
        </nav>
    );
};

export default Navigation;