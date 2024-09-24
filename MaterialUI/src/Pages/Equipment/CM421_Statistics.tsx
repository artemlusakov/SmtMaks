import React from 'react'
import s from "../../Components/CM421/CM421_Statistics.module.css"
import CM421ItemError from '../../Components/CM421/CM421Components/CM421ItemError'

import CM421ItemOperate from '../../Components/CM421/CM421Components/CM421itemOperate'
import СM421ItemOperateData from '../../Components/CM421/CM421Components/CM421itemOperateDate'
import CM421EquipmentEfficiency from '../../Components/CM421/CM421Components/CM421EquipmentEfficiency'
import ErrorCodesComponent from '../../Components/CM421/CM421Components/ErrorCodesComponent'


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
          </div>
        </div>
      </div>

      <div className={s.CM421__RightBox}>
        <div className={s.CM421__RightBox_Content}>
        {/* <img src={CM421Img} alt="" /> */}
          <div className={s.CM421__RightBox_Content_Text}>
            <h2>CM 421</h2>

            <ErrorCodesComponent/>
          </div>

        </div>
      </div>
    </div>
  )
}
