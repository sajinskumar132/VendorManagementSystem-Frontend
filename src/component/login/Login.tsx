import { Form, Input, Button } from 'antd';
import './loginstyle.css'
import { authServiceApi } from '../../api/authServiceApis';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Services } from '../../service/Services';
import { ILogin } from '../../store/Interfaces';

function Login() {
    const navigate=useNavigate()
    const [Loading,SetLoading]=useState(false)
    useEffect(()=>{
        Services.ResetLocalStorage()
    },[])
    const onFinish = (values:ILogin) => {
        SetLoading(true)
        authServiceApi.LoginApi(values).then(()=>{
            navigate("/dashboard")
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            SetLoading(false)
        })
      };
    return (
        <div className='loginMainContainet'>
            <p className='logintext'>Login</p>
            <Form
                layout={'vertical'}
                requiredMark={false}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>

                    <Button type="primary" htmlType="submit" loading={Loading} block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <p className='footer'>Dont have an account? <a className='anchortag' href='/signup'>SignUp</a></p>
            <p className='footer'>Do you want to redirect? <a className='anchortag'href='/dashboard'>Dashboard</a> </p>
        </div>
    )
}

export default Login
