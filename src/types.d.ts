export interface Products{
    id: string,
    name: string,
    description: string,
    imgURI: string,
    author: string,
    price: number,
    arraImg: Array<string>,
    category: string,
    buys: number,
    created_at: Date
}