import React, { useEffect, useState } from 'react'
import { Services } from '../../../service/Services'
import './navbarStyle.css'
import { Avatar, Button, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import { UpdateStates } from '../../../store/billSlice'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const [Details, SetDetails] = useState<any>()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        SetDetails(Services.GetDetailsLocatlStorage())
    }, [])

    const onUpdate=()=>{
        Services.ResetLocalStorage()
        SetDetails(null)
        dispatch(UpdateStates())
    }
    const content = (
        <div className='userDetails'>
          <p>{Details?.vendorName}</p>
          <p>{Details?.email}</p>
          <Button block onClick={onUpdate}>Logout</Button>
        </div>
      );
    return (
        <nav className='navContainer'>
            <div>
                <h4>vendor management system</h4>
            </div>
            <div>
                {Details ? <Popover content={content} title="" trigger="click">
                    <Avatar>{Details?.vendorName.charAt(0).toUpperCase()}</Avatar>
                </Popover> : <button className='LoginButton' onClick={()=>{
                    navigate('/login')
                }}>Login</button>}
            </div>
        </nav>
    )
}

export default Navbar
