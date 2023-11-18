import { notification } from "antd";
import axios from "axios";
import { ILogin, ISignUp } from "../store/Interfaces";

export class authServiceApi{
    static Url=process.env.REACT_APP_URL
    static LoginApi=async (data:ILogin)=>{
        try {
            const response = await axios.post(`${authServiceApi.Url}/login`,data)
            localStorage.setItem("vendorDetails", JSON.stringify(response.data.data));
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

    static SignUpApi=async (data:ISignUp)=>{
        try {
            const response = await axios.post(`${authServiceApi.Url}/signup`,data)
            localStorage.setItem("vendorDetails", JSON.stringify(response.data.data));
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