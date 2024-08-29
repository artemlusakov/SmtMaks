import React from 'react'
import s from "./MC421_Statistics.module.css"
import FileDropZone from '../Blob/FileDropZone'

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
              <div className={s.MC421__LeftBox_Content_Item}>
                1
              </div>
              <div className={s.MC421__LeftBox_Content_Item}>
                1
              </div>
            </div>

            
            <FileDropZone 
              className={s.Blob} 
              onFileUpload={handleFileUpload} 
            />
            
          </div>
        </div>

        <div className={s.MC421__Box__Error}>
          <h3>Статистика с ???.log</h3>          
        </div>
      </div>

      <div className={s.MC421__RightBox}>
      
      </div>
    </div>
  )
}
