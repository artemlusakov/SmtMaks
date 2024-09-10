import React from 'react'
import s from "./CM421_Statistics.module.css"
import CM421ItemError from './CM421Components/CM421ItemError'

import CM421Img from "../../../public/IMG/CM421.jpg"

import CM421ItemOperate from './CM421Components/CM421itemOperate'
import СM421ItemOperateData from './CM421Components/CM421itemOperateDate'
import CM421EquipmentEfficiency from './CM421Components/CM421EquipmentEfficiency'


interface MC421StatisticsProps {
  warningCount: number;
  filteredCount: number;

  targetCount: number;
  completedTasks: number;
}

export default function MC421_Statistics(props: MC421StatisticsProps): React.ReactElement{
  return (
    <div className={s.MC421}>
      <div className={s.MC421__LeftBox}>
        <div className={s.MC421__Box}>
          <div className={s.MC421__LeftBox_Content}>
                <CM421ItemError/>
                <CM421ItemOperate/>
          </div>
        </div>

        <div className={s.MC421__Box}>
          <div className={s.MC421__LeftBox_Content}>
            <СM421ItemOperateData/>
            <CM421EquipmentEfficiency/>
          </div>
        </div>
      </div>

      <div className={s.MC421__RightBox}>
        <div className={s.MC421__RightBox_Content}>
        <img src={CM421Img} alt="" />
          <div className={s.MC421__RightBox_Content_Text}>
            <h2>MC 421</h2>
          </div>

        </div>
      </div>
    </div>
  )
}
