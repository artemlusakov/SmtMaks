import s from './Main.module.css'

import MainClok from './Components/Clock/MainClok'
import WorkingLineElement from './Components/WorkingLineElement/WorkingLineElement';

export default function Main() {
  const id = "e133415";
  const value = 100;
  const value2 = 1100;
  const value3 = 2000;
  

  return (
    <div className={s.MainContent}>
      <MainClok/>

      <div className={s.MainContent__WorkingLine}>
        <div className={s.WorkingLine_Box}>
        <WorkingLineElement 
          size='Element60x80' 
          titleNameElemet={'CM 421'} 
          idElement={id} 
          linkElement={'/CM421'} 
          nameElement={"CM 421"} 
          valueElement={value2}
        />
        <WorkingLineElement 
          size='Element100x50' 
          titleNameElemet={'Какоето оборудование'} 
          idElement={id} 
          linkElement={'/Test'} 
          nameElement={"Test"} 
          valueElement={value}
        />

        <WorkingLineElement 
          size='Element60x80' 
          titleNameElemet={'CM 421'} 
          idElement={id} 
          linkElement={'/CM421'} 
          nameElement={"CM 421"} 
          valueElement={value}
        />

        <WorkingLineElement 
          size='Element60x80' 
          titleNameElemet={'CM 421'} 
          idElement={id} 
          linkElement={'/CM421'} 
          nameElement={"CM 421"} 
          valueElement={value3}
        />        
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
