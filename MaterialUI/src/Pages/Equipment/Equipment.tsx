// import material-ui компонеты
import { Container} from "@mui/material";


// import css стилей
import "./Equipment.css"

// import Компонентов
import Clock from '../../Components/Clock/Clock.tsx'
import MC421_Statistics from "./CM421/CM421_Statistics.tsx"
import TemporaryDrawer from '../../Components/Navigate/Navigate.tsx'

export default function Equipment() {
  return (
    <div>
          <Container fixed className='Equipment'>
            <TemporaryDrawer/>
            <Clock/>
          </Container>
  
          <MC421_Statistics
            warningCount={0}
            filteredCount={0}
            targetCount={0}
            completedTasks={0}
          />
    </div>
  )
}
