import React from 'react'
import './GridLoader.css'
import { Grid } from 'react-loader-spinner'

export default function GridLoader() {
  return (
    <div className='GridLoader'>         
    <Grid
        visible={true}
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
    />
    </div>
  )
}
