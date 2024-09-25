import { Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './WorkingLineElement.css'

interface Props {
    titleNameElemet:string,
    idElement:string,
    linkElement:string,
    nameElement:string,
    valueElement?:number | undefined,
    size: string
}
export default function WorkingLineElement(props:Props) {

      // Функция для определения статуса
      const getStatusClass = (value?:number) => {
        if (value && value > 1500) return "WorkingLine__Element_bad";
        else if (value && value > 1000) return "WorkingLine__Element_normal";
        else return "WorkingLine__Element_good";
      };
  

  return (
    <Tooltip title={`${props.titleNameElemet} id: ${props.idElement}`} classes={{ tooltip: "customTooltip" }}>
    <NavLink to={`${props.linkElement}`} className={`${"WorkingLine__Element"} ${props.size} ${getStatusClass(props.valueElement ?? 0)}`}>
      <div>{props.nameElement}</div>
    </NavLink>
  </Tooltip>
  )
}
