import React from 'react'
import s from './Main.module.css'
import { Tooltip } from '@mui/material';

export default function Main() {
  const id = "e133415";
  const value = 100

  // Функция для определения статуса
  const getStatusClass = (value:number) => {
    if (value > 1500) return s.WorkingLine__Element_bad;
    else if (value > 1000) return s.WorkingLine__Element_normal;
    else return s.WorkingLine__Element_good;
  };

  return (
    <div className={s.MainContent}>
      <div className={s.MainContent__WorkingLine}>
        <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
          <div className={`${s.WorkingLine__Element} ${getStatusClass(value)}`}>CM 421</div>
        </Tooltip>
        <Tooltip title="CM 421" classes={{ tooltip: s.customTooltip }}>
          <div className={`${s.WorkingLine__Element} ${getStatusClass(value)}`}>CM 421</div>
        </Tooltip>
        <Tooltip title="CM 421" classes={{ tooltip: s.customTooltip }}>
          <div className={`${s.WorkingLine__Element} ${getStatusClass(value)}`}>CM 421</div>
        </Tooltip>
      </div>
    
      <div className={s.MainContent__Statistic}>
        <div className={s.Statistic__Box}>
          <h3>Самое не эфективное оборудование</h3>
        </div>
        <div className={s.Statistic__Box}>
          <h3>Самое не эфективное оборудование</h3>
        </div>
        <div className={s.Statistic__Box}>
          <h3>Самое не эфективное оборудование</h3>
        </div>
        <div className={s.Statistic__Box}>
          <h3>Самое не эфективное оборудование</h3>
        </div>
      </div>
    </div>
  )
}
