export class Services{

    static GetDetailsLocatlStorage(){
        let details

        let LocalStorage=localStorage.getItem('vendorDetails')
        if(LocalStorage){
            details=JSON.parse(LocalStorage)
        }
        return details
    }

    static ApiHeader(){
        let details = Services.GetDetailsLocatlStorage()
        return {headers:{Authorization:`Bearer ${details?.token}`}}
    }

    static ResetLocalStorage(){
        localStorage.removeItem('vendorDetails')
    }
}