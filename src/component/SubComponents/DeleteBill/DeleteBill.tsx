import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BillServiceClass } from '../../../api/billServiceApis';
import { useDispatch } from 'react-redux';
import { UpdateStates } from '../../../store/billSlice';

function DeleteBill({id}:{id:string}) {
    const dispatch=useDispatch()
    const [Loading,SetLoading]=useState(false)
    const deleteBill=()=>{
        SetLoading(true)
        BillServiceClass.DeleteBill(id).then(() => {
            dispatch(UpdateStates())
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {
            SetLoading(false)
        })
    }
  return (
    <div>
      <Button icon={<DeleteOutlined />} loading={Loading} onClick={()=>{
        deleteBill()
      }}/>
    </div>
  )
}

export default DeleteBill
