import React from 'react';
import s from './Logo.module.css'
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <NavLink to={'/'} className={s.Logo}>
            Cmt/Maks
        </NavLink>
    );
};

export default Logo;