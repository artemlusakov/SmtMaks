import Navigation from "../../Components/Navigation/Navigation";
import s from './Equipment.module.css'

import mc421 from '../../assets/mc421.webp'
import EquipmentCard from "../../Components/EquipmentCard/EquipmentCard";

const Equipment = () => {
    return (
        <div className={`${s.Equipment} ${'Flex'}`}>
            <Navigation/>

            <div className={s.Equipment__content}>
                <EquipmentCard img={mc421} NameEquip='mc421'/>
            </div>
        </div>
    );
};

export default Equipment;