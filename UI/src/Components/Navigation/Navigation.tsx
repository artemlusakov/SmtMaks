import Logo from "../Logotip/Logo";
import s from "./Navigation.module.css"
import {NavLink} from "react-router-dom";


const Navigation = () => {
    return (
        <nav>
            <Logo/>

            <div className={s.Nav__Links}>
                <NavLink to={'/Home'}>Главная</NavLink>
                <NavLink to={'/Equipment'}>Оборудование</NavLink>
                <NavLink to={'/'}>Text</NavLink>
                <NavLink to={'/'}>Text</NavLink>
                <NavLink to={'/'}>Text</NavLink>
            </div>

            <div className={s.Nav__Contacts}>
                <h3>Главный программист : </h3><a href="tel:+79158902193">+7 915-890-21-93</a>
            </div>
        </nav>
    );
};

export default Navigation;