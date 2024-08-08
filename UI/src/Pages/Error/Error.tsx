import React from 'react';
import s from './Error.module.css'
import {NavLink} from "react-router-dom";

const Error = () => {
    return (
        <div className={s.Error}>
            <div className={s.Error__Text}>
                <h1>Ошибка 404 вернитесь назад  </h1> <NavLink to={'/'}>Вернутся</NavLink>
            </div>
        </div>
    );
};

export default Error;