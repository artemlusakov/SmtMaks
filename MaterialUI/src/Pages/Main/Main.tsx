// import css стилей
import s from './Main.module.css'

// import Компонентов
import MainClok from './Components/Clock/MainClok'
import WorkingLineElement from './Components/WorkingLineElement/WorkingLineElement';

// import хуков
import { useState } from 'react';

export default function Main() {
  const elements = [
    {
       id: "e133415",
      link: '/CM421', 
      size: "Element60x80",
      name:"CM 421", 
      title: "CM 421", 
      value: 100 
    },

    { 
      id: "e133415",
      link: '/CM421', 
      size: "Element100x50",
      name:"Test", 
      title: "Какоето оборудование", 
      value: 1100 
    },
    {
      id: "e133415",
      link: '/CM421',
      size: "Element60x80",
      name: "CM 421", 
      title: "CM 421", 
      value: 200 
      },

    { 
      id: "e133415",
      link: '/CM421', 
      size: "Element60x80",
      name:"CM 421", 
      title: "CM 421", 
      value: 2000 
    },

    { 
      id: "e133415",
      link: '/CM421', 
      size: "Element100x50",
      name:"Test", 
      title: "Какоето оборудование", 
      value: 100 
    },
  ];
  
  const [workingLineElements, setWorkingLineElements] = useState(elements);


  return (
    <div className={s.MainContent}>
      <MainClok/>

      <div className={s.MainContent__WorkingLine}>
        <div className={s.WorkingLine_Box}>
          {workingLineElements.map((item, index) => (
            <WorkingLineElement
              key={index}
              titleNameElemet={item.title}
              idElement={item.id}
              linkElement={item.link}
              nameElement={item.name}
              valueElement={item.value}
              size={item.size}
            />
          ))}
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
