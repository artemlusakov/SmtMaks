import s from './EquipmentCard.module.css'

import { NavLink } from "react-router-dom";

const EquipmentCard = (props:any) => {
    return (
        <NavLink to = '/mc421'>
            <div className={s.Equipment__card}>
                <img src={props.img} alt="img" />
                <h2>{props.NameEquip}</h2>
            </div>
        </NavLink>
    );
};

export default EquipmentCard;

