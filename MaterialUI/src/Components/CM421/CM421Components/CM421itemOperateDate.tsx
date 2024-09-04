import React from 'react'

export default function CM421itemOperateDate() {
  fetch('/Operate.json')
    .then(response => {
      if (!response.ok){
        throw new Error('Ошибка загрузки файла Operate.json');
      }
      return response.json();
    })
    .then(data => {
      const firstData = data[0];
      const endData = data[data.length - 1]
      console.log('Получена firstData:', firstData.datetime);
      console.log('Получена endData:', endData.datetime);
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
    
  return (
    <div>CM421itemOperateData</div>
  )
}
