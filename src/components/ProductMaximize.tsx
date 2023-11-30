import { useEffect, useMemo, useState } from "react"
import { Products } from "../types"
import axios from "axios";
import {useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useUser} from '@clerk/clerk-react'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

export default function ProductMaximize() {
    const [data, setData] = useState<Products>();
    const {id} = useParams<{id: string}>()
    const {user} = useUser();
    const [isaddcar, setIsaddcar] = useState<boolean>(false)
    const [image, setImage] = useState<string | undefined>("");
    

    useMemo(()=>{
        const getData = async() =>{
            const res : Products = (await axios.get(`${import.meta.env.VITE_API_URL}products/${id}?username=${import.meta.env.VITE_ACCESS}`)).data
            setData(res)
            
        }
        
        getData();
        
    },[])

    useEffect(()=>{
        const isAddcar = async() =>{
            console.log(user?.firstName);
            
            await axios.get(`${import.meta.env.VITE_API_URL}carshop/${id}/${user?.fullName}?username=${import.meta.env.VITE_ACCESS}`)
            .then((res)=>{
                if(res.status == 200){
                    setIsaddcar(true)
                }
            })
        }
        if(user){
            isAddcar(); 
            setImage(data?.imgURI)
        }
        
    },[user])

    const payProduct = async() =>{
        await axios.post(`https://stripe-node-microservice.vercel.app/api/stripe`,{
            api_key_stripe: data?.key_stripe,
            mode: "payment",
            price: data?.price,
            quantity: 1,
            currency: 'usd',
            name: data?.name,
            success_url: `https://info-compiler.netlify.app/?email=${data?.email}`,
            cancel_url: location.href
        }).then((res)=>location.href = res.data)
        .catch((err)=>console.log(err))
    }

    const reserveProduct = (id: string | undefined) =>{
        
        axios.post(`${import.meta.env.VITE_API_URL}carshop?username=${import.meta.env.VITE_ACCESS}`,{
            user: user?.fullName,
            newProduct: id
        })
        .then((res)=>{console.log(res); toast.success("Product add to carshop"); setTimeout(()=>location.href = "/carshop", 2000);}
        )
        .catch((err)=>console.log(err))
    }

  return (
    <div className="p-5 flex max-sm:flex-col gap-x-28">
        <section className="w-[30%] max-sm:w-[100%]">
            <img src={image} className="w-auto rounded-sm h-96" alt={data?.name} />
            {
               data?.arrayImg.length! > 0 ? 
               <div className="flex justify-between max-sm:flex-col max-sm:px-16 max-sm:mb-16 gap-y-5 mt-10">
                    {
                        data?.arrayImg.map((e)=>(
                            <img src={e} alt={data._id} onClick={()=>setImage(e)} className="cursor-pointer hover:scale-105 w-auto h-28 rounded-sm" />
                        ))
                    }
                </div>
                : null
            }
            
        </section>
        <section className="w-[50%] max-sm:w-[100%] max-sm:mt-6 pb-16 gap-10 flex-col flex">
            <h1 className="text-white text-center text-3xl">{data?.name}</h1>
            <h2 className="text-blue-400 text-2xl">{data?.price} $</h2>
            <div>
                <p className="text-gray-400 mb-3">{data?.description}</p>
                <p className="text-green-300">by <span className="text-gray-300">{data?.author}</span></p>
            </div>
            {
                user?.fullName != data?.author ?
                    <div className="flex mt-10 justify-between">
                        {
                            !isaddcar ? 
                                <button onClick={()=>reserveProduct(data?._id)} className="bg-blue-600 rounded-md hover:scale-105 text-gray-400 px-4 py-2 w-[45%]">add car</button>
                                : <button onClick={payProduct} className="rounded-md text-white bg-green-600 cursor-default px-4 py-2 w-[45%]">This product ready add car</button>
                        }
                        <SignedIn>
                            <button onClick={payProduct} className="rounded-md text-white hover:bg-white hover:text-black px-4 py-2 w-[45%]">pay now</button> 
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn/>
                        </SignedOut>
                    </div>
                : null
            }
        </section>
    </div>
  )
}
