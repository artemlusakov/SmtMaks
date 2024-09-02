import React from 'react'
import s from "./CM421_Statistics.module.css"
import FileDropZone from '../Blob/FileDropZone'
import CM421ItemError from './CM421Components/CM421ItemError'
import CM421ItemErrorSelect from './CM421Components/CM421ItemErrorSelect'

import CM421itemOperate from './CM421Components/CM421itemOperate'


export default function MC421_Statistics() {
  const handleFileUpload = async (file) => {
    console.log(`Файл загружен: ${file.name}`);
    // Здесь вы можете добавить дополнительную логику для обработки файла
  };

  return (
    <div className={s.MC421}>
      <div className={s.MC421__LeftBox}>
        <div className={s.MC421__Box__Error}>
          <h3>Статистика с Error.log</h3>
          <div className={s.MC421__LeftBox_Content}>
            <div className={s.MC421__LeftBox_Content__Statistic}>
                <CM421ItemError/>
                <CM421ItemErrorSelect/>
            </div>

            
            <FileDropZone 
              className={s.Blob} 
              onFileUpload={handleFileUpload} 
            />
            
          </div>
        </div>

        <div className={s.MC421__Box__Error}>
          <h3>Статистика с Operate.log</h3> 
                 <CM421itemOperate/>
        </div>
      </div>

      <div className={s.MC421__RightBox}>
      
      </div>
    </div>
  )
}
