export interface User {
    id?: number,
    username: string,
    token: string,
    photoUlr: string
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
    PageNumber: number
    PageSize: number
}