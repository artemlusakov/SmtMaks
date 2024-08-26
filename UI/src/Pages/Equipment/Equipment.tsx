import Navigation from "../../Components/Navigation/Navigation";
import s from './Equipment.module.css'

import mc421 from '../../assets/mc421.webp'
import EquipmentCard from "../../Components/EquipmentCard/EquipmentCard";

const Equipment = () => {
    return (
        <div className={`${s.Equipment} ${'Flex'}`}>
            <Navigation/>

            <div className={s.Equipment__content}>
                <h2>Выбирете Оборудование</h2>
                <EquipmentCard URL="/mc421" img={mc421} NameEquip='mc421'/>
                <EquipmentCard img={mc421} NameEquip='mc422'/>
                <EquipmentCard img={mc421} NameEquip='mc423'/>
                <EquipmentCard img={mc421} NameEquip='mc424'/>
                <EquipmentCard img={mc421} NameEquip='mc425'/>
                <EquipmentCard img={mc421} NameEquip='mc426'/>
                <EquipmentCard img={mc421} NameEquip='mc427'/>
                <EquipmentCard img={mc421} NameEquip='mc428'/>
            </div>
        </div>
    );
};

export default Equipment;