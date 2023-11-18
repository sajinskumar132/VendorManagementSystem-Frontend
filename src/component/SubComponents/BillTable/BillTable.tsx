import React, { useEffect, useState } from 'react';
import { Button, Progress, Space, Spin, Table, Tag } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { BillServiceClass } from '../../../api/billServiceApis';
import { UpdateBills } from '../../../store/billSlice';
import { RootState } from '../../../store/rootStore';
import { IBill } from '../../../store/Interfaces';
import type { ColumnsType } from 'antd/es/table';
import PaymentPopOver from '../PaymentPopOver/PaymentPopOver';
import BillUpdateModal from '../BillUpdateModal/BillUpdateModal';
import DeleteBill from '../DeleteBill/DeleteBill';
import { Services } from '../../../service/Services';


function BillTable() {
  const dispatch = useDispatch();
  const [Details,SetDetails]=useState()
  const Bills = useSelector((state: RootState) => state.bill.bills);
  const UpdateState=useSelector((state:RootState)=>state.bill.UpdateState)
  const [Loading,SetLoading]=useState(false)
  useEffect(() => {
    let details = Services.GetDetailsLocatlStorage()
    if(details){
        SetLoading(true)
        BillServiceClass.GetBillsByVendor(details.id)
        .then((response) => {
          dispatch(UpdateBills(response!.data));
        })
        .catch((error: any) => {
          console.log(error);
        }).finally(()=>{
            SetLoading(false)
        })

    }else{
        SetLoading(true)
        BillServiceClass.GetBills()
        .then((response) => {
          dispatch(UpdateBills(response!.data));
        })
        .catch((error: any) => {
          console.log(error);
        }).finally(()=>{
            SetLoading(false)
        })
    }
    SetDetails(details)
  }, [UpdateState]);
  type DataType={
        key: string,
        invoiceNumber:  string,
        vendorName:  string,
        description: string,
        createdAt:  string,
        totalAmount: number,
        totalPaid: number,
        balanceAmount: number,
        paidPercentage: number,
        status:  string
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Total Paid',
      dataIndex: 'totalPaid',
      key: 'totalPaid',
    },
    {
      title: 'Balance Amount',
      dataIndex: 'balanceAmount',
      key: 'balanceAmount',
    },
    {
      title: 'Paid Percentage',
      dataIndex: 'paidPercentage',
      key: 'paidPercentage',
      render: (_,{paidPercentage}) => (
        <>
         <Progress type="circle" percent={Math.round(paidPercentage)} size={50} />
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_,{status}) => (
        <>
          <Tag color={status==="Paid"?'#87d068':status==="partially Paid"?"#108ee9":"#f50"}>{status}</Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
            {Details?
            <>
            {record.status!=='Paid'? <BillUpdateModal id={record.key} details={record}/>:<></>}
            <DeleteBill  id={record.key}/>
            </>:<>{record.status!=='Paid'? <PaymentPopOver id={record.key} balanceAmount={record.balaceAmount}/>:<></>}</>
            }
        </Space>
      ),
    },
  ];

  const Datas = () => {
    const data = Bills.map((item: IBill) => {
      return {
        key: item._id,
        invoiceNumber: item.invoiceNumber,
        vendorName: item.vendorName,
        description: item.description,
        createdAt: item.createdAt,
        totalAmount: item.totalAmount,
        totalPaid: item.totalPaid,
        balanceAmount: item.balaceAmount,
        paidPercentage: item.paidPercentage,
        status: item.status
      };
    });
    return data;
  };

  return (
    <div>
        <Spin spinning={Loading}>
          <Table  columns={columns} dataSource={Datas()} bordered  pagination={{pageSize: 6}}/>
        </Spin>
    </div>
  );
}

export default BillTable;
