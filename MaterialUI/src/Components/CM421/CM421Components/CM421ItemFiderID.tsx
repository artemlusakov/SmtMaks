import React, { useEffect } from 'react'

interface DataItem {
    datetime: string;
    message: string;
  }
  
export default function CM421ItemFiderID() {
    useEffect(()=>{
        fetch('Operate.json')
        .then(respons => respons.json)
        .then((data:DataItem[])=>{
            if (Array.isArray(data)) {
                
              } else {
                
              }
        })
    })

  return (
    <div>
        <ul>
            
        </ul>
    </div>
  )
}
