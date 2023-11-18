export interface IBill {
    _id: string
    vendorName: string
    invoiceNumber: string
    description: string
    totalAmount: number
    totalPaid: number
    balaceAmount: number
    paidPercentage: number
    status: string
    createdAt: string
    updatedAt: string
    __v: number
}
export interface ILogin{
    email:string
    password:String
}

export interface ISignUpForm{
    vendorName:string
    email:string
    password:string
    confirm:string
}

export interface ISignUp{
    vendorName:string
    email:string
    password:string
}

export interface INewBill{
    invoiceNumber:string
    description:string
    totalAmount:number
}

export interface IUpdateBill{
    description:string
    totalAmount:number
}