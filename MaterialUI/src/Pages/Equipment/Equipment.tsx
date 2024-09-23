import React from 'react'
import TemporaryDrawer from '../../Components/Navigate/Navigate.tsx'
import { Container} from "@mui/material";
import MC421_Statistics from "./CM421_Statistics.tsx"

import Clock from '../../Components/Clock/Clock.tsx'

export default function Equipment() {
  return (
    <div>
          <Container fixed className='App__Container'>
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
