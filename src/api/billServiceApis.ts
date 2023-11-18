import { notification } from "antd";
import axios from "axios";
import { Services } from "../service/Services";
import { INewBill, IUpdateBill } from "../store/Interfaces";

export class BillServiceClass{
    static Url=process.env.REACT_APP_URL
    static async GetBills(){
        try {
            const response = await axios.get(`${BillServiceClass.Url}/bills`)
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            if(error.message==="Network Error"){
                notification.error({
                    message:"Network Error"
                })
            }else{
                notification.error({
                    message:error.response.data.message
                })
                return Promise.reject({status:error.response.status,data:error});
            }
        }
    }

    static async GetBillsByVendor(id:string){
        try {
            const response = await axios.get(`${BillServiceClass.Url}/${id}/bills`,Services.ApiHeader())
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            if(error.message==="Network Error"){
                notification.error({
                    message:"Network Error"
                })
            }else{
                notification.error({
                    message:error.response.data.message
                })
                return Promise.reject({status:error.response.status,data:error});
            }
        }
    }

    static async UpdatePayment(id:string,amount:number){
        try {
            const response = await axios.patch(`${BillServiceClass.Url}/${id}/updatePayment`,{amount})
            notification.success({
                message:response.data.message
            })
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            if(error.message==="Network Error"){
                notification.error({
                    message:"Network Error"
                })
            }else{
                notification.error({
                    message:error.response.data.message
                })
                return Promise.reject({status:error.response.status,data:error});
            }
        }
    }

    static async newBill(data:INewBill){
        try {
            const response = await axios.post(`${BillServiceClass.Url}/newbill`,data, Services.ApiHeader())
            notification.success({
                message:response.data.message
            })
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            if(error.message==="Network Error"){
                notification.error({
                    message:"Network Error"
                })
            }else{
                notification.error({
                    message:error.response.data.message
                })
                return Promise.reject({status:error.response.status,data:error});
            }
        }
    }

    static async UpdateBill(id:string,data:IUpdateBill){
        try {
            const response = await axios.patch(`${BillServiceClass.Url}/${id}/updatebill`,data, Services.ApiHeader())
            notification.success({
                message:response.data.message
            })
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            if(error.message==="Network Error"){
                notification.error({
                    message:"Network Error"
                })
            }else{
                notification.error({
                    message:error.response.data.message
                })
                return Promise.reject({status:error.response.status,data:error});
            }
        }
    }

    static async DeleteBill(id:string){
        try {
            const response = await axios.delete(`${BillServiceClass.Url}/${id}/deletebill`,Services.ApiHeader())
            notification.success({
                message:response.data.message
            })
            return Promise.resolve({status:response.status,data:response.data.data});
        } catch (error:any) {
            if(error.message==="Network Error"){
                notification.error({
                    message:"Network Error"
                })
            }else{
                notification.error({
                    message:error.response.data.message
                })
                return Promise.reject({status:error.response.status,data:error});
            }
        }
    }
}