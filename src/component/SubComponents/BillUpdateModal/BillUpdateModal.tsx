import  { useState } from 'react'
import { BillServiceClass } from '../../../api/billServiceApis';
import { Button, Form, Input, InputNumber, Modal} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UpdateStates } from '../../../store/billSlice';
import { IBill, IUpdateBill } from '../../../store/Interfaces';
function BillUpdateModal({ id, details }: { id: string, details: IBill }) {
    const dispatch=useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Loading, SetLoading] = useState(false)
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinish = (value: IUpdateBill) => {
        SetLoading(true)
        BillServiceClass.UpdateBill(id, value).then(() => {
            dispatch(UpdateStates())
            setIsModalOpen(false)
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {
            SetLoading(false)
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Button icon={<EditOutlined />} onClick={showModal} />

            <Modal title={`Update (${details.invoiceNumber})`}
                okButtonProps={{ loading: Loading }}
                okText="Update"
                onOk={form.submit}
                onCancel={handleCancel}
                open={isModalOpen}
                 >
                <Form
                    form={form}
                    layout={'vertical'}
                    requiredMark={false}
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        description:details.description,
                        totalAmount:details.totalAmount
                    }}
                >
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
                        <InputNumber min={1} style={{ 'width': '100%' }}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


export default BillUpdateModal
