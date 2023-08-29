import { useMemo, useState } from "react"
import { Products } from "../types"
import axios from "axios";
import {useParams} from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'

export default function ProductMaximize() {
    const [data, setData] = useState<Products>();
    const {id} = useParams<{id: string}>()
    const {user} = useUser();
    
    useMemo(()=>{
        const getData = async() =>{
            const res = (await axios.get(`${import.meta.env.VITE_API_URL}products/${id}?username=${import.meta.env.VITE_ACCESS}`)).data

            setData(res)
        }
        getData();
    },[])

    const payProduct = async() =>{
        await axios.post(`https://stripe-node-microservice.vercel.app/api/stripe`,{
            api_key_stripe: data?.key_stripe,
            mode: "payment",
            price: data?.price,
            quantity: 1,
            currency: 'usd',
            name: data?.name,
            success_url: location.href,
            cancel_url: location.href
        }).then((res)=>location.href = res.data)
        .catch((err)=>console.log(err))
    }

    const reserveProduct = (id: string | undefined) =>{
        axios.post(`${import.meta.env.VITE_API_URL}carshop?username=${import.meta.env.VITE_ACCESS}`,{
            user: user?.firstName,
            newProduct: id
        })
        .then(()=>alert("product add to carshop"))
        .catch((err)=>console.log(err))
    }

  return (
    <div className="p-5 flex gap-x-28">
        <section>
            <img src={data?.imgURI} className="w-auto rounded-sm h-96" alt={data?.name} />
        </section>
        <section className="w-[50%] gap-10 flex-col flex">
            <h1 className="text-white text-center text-3xl">{data?.name}</h1>
            <h2 className="text-blue-400 text-2xl">{data?.price} $</h2>
            <div>
                <p className="text-gray-400 mb-3">{data?.description}</p>
                <p className="text-green-300">by <span className="text-gray-300">{data?.author}</span></p>
            </div>
            <div className="flex mt-10 justify-between">
                <button onClick={()=>reserveProduct(data?._id)} className="bg-blue-600 rounded-md hover:scale-105 text-gray-400 px-4 py-2 w-[45%]">add car</button>
                <button onClick={payProduct} className="rounded-md text-white hover:bg-white hover:text-black px-4 py-2 w-[45%]">pay now</button> 
            </div>
            
        </section>
    </div>
  )
}
