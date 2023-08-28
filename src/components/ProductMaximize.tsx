import { useMemo, useState } from "react"
import { Products } from "../types"
import axios from "axios";
import {useParams} from 'react-router-dom'

export default function ProductMaximize() {
    const [data, setData] = useState<Products>();
    const {id} = useParams<{id: string}>()
    
    useMemo(()=>{
        const getData = async() =>{
            const res = (await axios.get(`${import.meta.env.VITE_API_URL}products/${id}?username=${import.meta.env.VITE_ACCESS}`)).data

            setData(res)
        }
        getData();
    },[])

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
                <button className="bg-blue-600 rounded-md text-gray-400 px-4 py-2 w-[45%]">add car</button>
                <button className="rounded-md text-white hover:bg-white hover:text-black px-4 py-2 w-[45%]">pay now</button> 
            </div>
            
        </section>
    </div>
  )
}
