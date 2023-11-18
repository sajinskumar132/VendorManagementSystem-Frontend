import { Button, Drawer, Form, Input, InputNumber } from 'antd'
import React, { useState } from 'react'
import { BillServiceClass } from '../../../api/billServiceApis';
import { useDispatch } from 'react-redux';
import { UpdateStates } from '../../../store/billSlice';
import { INewBill } from '../../../store/Interfaces';

function BillCreateDrawer() {
    const dispatch=useDispatch()
    const [open, setOpen] = useState(false);
    const [Loading, SetLoading] = useState(false)
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onFinish = (values: INewBill) => {
        SetLoading(true)
        BillServiceClass.newBill(values).then(() => {
            onClose()
            dispatch(UpdateStates())
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {
            SetLoading(false)
        })
        console.log(values)
    }

    return (
        <div>
            <>
                <Button type="primary" onClick={showDrawer}>
                    Create
                </Button>
                <Drawer title="Create a New Bill" placement="right" onClose={onClose} open={open}>
                    <Form
                        layout={'vertical'}
                        requiredMark={false}
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Invoice Number"
                            name="invoiceNumber"
                            rules={[{ required: true, message: 'Please input your invoiceNumber!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Total Amount"
                            name="totalAmount"
                            rules={[{ required: true, message: 'Please input your totalAmount!' }]}
                        >
                            <InputNumber style={{ 'width': '100%' }}/>
                        </Form.Item>
                        <Form.Item>

                            <Button type="primary" htmlType="submit" block loading={Loading}>
                                Create New Bill
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
        </div>
    )
}

export default BillCreateDrawer
