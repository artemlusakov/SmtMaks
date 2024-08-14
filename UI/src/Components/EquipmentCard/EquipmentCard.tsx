import s from './EquipmentCard.module.css'

import { NavLink } from "react-router-dom";

const EquipmentCard = (props:any) => {
    return (
        <NavLink to = {props.URL}>
            <div className={s.Equipment__card}>
                <img src={props.img} alt="img" />
                <h2>{props.NameEquip}</h2>
            </div>
        </NavLink>
    );
};

export default EquipmentCard;

