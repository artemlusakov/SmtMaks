import React from 'react'
import s from "./CM421_Statistics.module.css"
import CM421ItemError from './CM421Components/CM421ItemError'


// import компонентов 
import CM421ItemOperate from './CM421Components/CM421itemOperate'
import СM421ItemOperateData from './CM421Components/CM421itemOperateDate'
import CM421EquipmentEfficiency from './CM421Components/CM421EquipmentEfficiency'
import ErrorCodesComponent from './CM421Components/ErrorCodesComponent'
import CM421ItemFiderID from './CM421Components/ListFeederID/CM421ItemFiderID'
import LockedUnlocked from './CM421Components/LockedUnlocked'



// Интерфейс для пропсов
interface MC421StatisticsProps { 
  warningCount: number;   
  filteredCount: number;

  targetCount: number;
  completedTasks: number;
}

export default function MC421_Statistics(props: MC421StatisticsProps): React.ReactElement{
  return (
    <div className={s.CM421}>
      <div className={s.CM421__LeftBox}>
        <div className={s.CM421__Box}>
          <div className={s.CM421__LeftBox_Content}>
                <CM421ItemError/>
                <CM421ItemOperate/>

          </div>
        </div>

        <div className={s.CM421__Box}>
          <div className={s.CM421__LeftBox_Content}>
            <СM421ItemOperateData/>
            <CM421EquipmentEfficiency/>
            <LockedUnlocked/>
          </div>
        </div>
      </div>

      <div className={s.CM421__RightBox}>
        <div className={s.CM421__RightBox_Content}>
        {/* <img src={CM421Img} alt="" /> */}
          <div className={s.CM421__RightBox_Content_Text}>
            <h2>CM 421</h2>
            <ErrorCodesComponent/>
            <CM421ItemFiderID/>
          </div>

        </div>
      </div>
    </div>
  )
}
