import React from 'react'
import s from "./CM421_Statistics.module.css"
import CM421ItemError from './CM421Components/CM421ItemError'
import CM421ItemErrorSelect from './CM421Components/CM421ItemErrorSelect'

import CM421ItemOperate from './CM421Components/CM421itemOperate'
import СM421ItemOperateData from './CM421Components/CM421itemOperateDate'


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
           <СM421ItemOperateData/>

        </div>
      </div>

      <div className={s.MC421__RightBox}>

      {/* <WarningRatioChart 
          totalWarnings={props.warningCount} 
          headAndFiderWarnings={props.filteredCount}
        /> */}


      </div>
    </div>
  )
}
