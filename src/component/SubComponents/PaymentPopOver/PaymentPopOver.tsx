import { Button, InputNumber, Modal, Popover, Spin } from 'antd'
import React, { useState } from 'react'
import { PayCircleOutlined } from '@ant-design/icons';
import { BillServiceClass } from '../../../api/billServiceApis';
import { useDispatch } from 'react-redux';
import { UpdateStates } from '../../../store/billSlice';
function PaymentPopOver({ id, balanceAmount }: { id: string, balanceAmount: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch=useDispatch()
    const [amount, Setamount] = useState(0)
    const [Loading, SetLoading] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        SetLoading(true)
        BillServiceClass.UpdatePayment(id, amount).then(() => {
            setIsModalOpen(false)
            dispatch(UpdateStates())
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {
            SetLoading(false)
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange = (value: number) => {
        Setamount(value)
    };

    return (
        <>
            <Button icon={<PayCircleOutlined />} onClick={showModal} />

            <Modal title="Pay your amount"
                okButtonProps={{ loading: Loading }}
                okText="Pay"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Spin spinning={Loading}>
                    <p>Enter your amount </p>
                    <InputNumber min={1} onChange={(e: any) => onChange(e)} style={{ 'width': '100%' }} />
                </Spin>

            </Modal>
        </>
    )
}

export default PaymentPopOver
