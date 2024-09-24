import React from 'react'
import s from './Main.module.css'
import { Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useDrag } from 'react-dnd';

import MainClok from './Clock/MainClok'

export default function Main() {
  const id = "e133415";
  const value = 100;
  const value2 = 1100;
  const value3 = 2000;
  // Функция для определения статуса
  const getStatusClass = (value:number) => {
    if (value > 1500) return s.WorkingLine__Element_bad;
    else if (value > 1000) return s.WorkingLine__Element_normal;
    else return s.WorkingLine__Element_good;
  };
  

  return (
    <div className={s.MainContent}>
      <MainClok/>

      <div className={s.MainContent__WorkingLine}>
        <div className={s.WorkingLine_Box}>
          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${s.Hanwha} ${getStatusClass(value)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>

          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${s.Hanwha} ${getStatusClass(value2)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>

          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${s.Hanwha} ${getStatusClass(value)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>
        </div>

        <div className={s.WorkingLine_Box}>
          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${getStatusClass(value)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>

          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${getStatusClass(value2)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>

          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${getStatusClass(value3)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>
        </div>

        <div className={s.WorkingLine_Box}>
          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${getStatusClass(value)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>

          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${getStatusClass(value2)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>

          <Tooltip title={`CM 421 id: ${id}`} classes={{ tooltip: s.customTooltip }}>
            <NavLink to={'/CM421'} className={`${s.WorkingLine__Element} ${getStatusClass(value3)}`}>
              <div>CM 421</div>
            </NavLink>
          </Tooltip>
        </div>
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
