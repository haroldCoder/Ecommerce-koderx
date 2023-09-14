export interface Products{
    _id: string | undefined,
    name: string,
    description: string,
    imgURI: string,
    author: string,
    price: number,
    arrayImg: Array<string>,
    category: string,
    buys: number,
    created_at: Date,
    key_stripe: string
}

export interface carShop{
    _id: string | undefined,
    user: string,
    products: Array<string>
}

export interface productShop{
    id?: string | undefined,
    name: string,
    price: number,
    imgURI: string,
    key_stripe: string
}