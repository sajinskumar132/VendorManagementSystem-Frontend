import { Form, Input, Button } from 'antd'
import './signupStyle.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authServiceApi } from '../../api/authServiceApis';
import { ISignUpForm } from '../../store/Interfaces';

function SignUp() {
    const navigate=useNavigate()
    const [Loading,SetLoading]=useState(false)
    const onFinish = (values: ISignUpForm) => {
        const data={
            "vendorName":values.vendorName,
            "email":values.email,
            "password":values.password
        }
        SetLoading(true)
        authServiceApi.SignUpApi(data).then(()=>{
            navigate("/dashboard")
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            SetLoading(false)
        })
      };
    return (
        <div className='signupMainContainet'>
            <p className='signuptext'>Sign Up</p>
            <Form
                layout={'vertical'}
                requiredMark={false}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Vendor Name"
                    name="vendorName"
                    rules={[{ required: true, message: 'Please input your Vendor Name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>

                    <Button type="primary" htmlType="submit" loading={Loading} block>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <p className='footer'>Already have an account? <a className='anchortag' href='/login'>Login</a></p>
            <p className='footer'>Do you want to redirect? <a className='anchortag'href='/dashboard'>Dashboard</a> </p>
        </div>
    )
}

export default SignUp
