export interface User {
    username: string,
    token: string
}


export interface ServiceParams {
    Gender?: string
    SearchTearm?: string
    Category?: string
    SubCategory?: string
    District?: string
    City?: string
    OrderBy?: string
    TopRatedServices?: number
    Status?: string
    PageNumber:number
    PageSize: number
}