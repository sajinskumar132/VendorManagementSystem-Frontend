import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Services } from '../../../service/Services'
import BillCreateDrawer from '../BilllCreateDrawer/BilllCreateDrawer'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootStore'

function Filter() {
    const [Details,SetDetails]=useState()
    const UpdateState=useSelector((state:RootState)=>state.bill.UpdateState)
    useEffect(()=>{
        SetDetails(Services.GetDetailsLocatlStorage())
    },[UpdateState])
  return (
    <div style={{float:'right','marginBottom':'8px'}}>
        {Details? <BillCreateDrawer/>:<></>}
    </div>
  )
}

export default Filter
