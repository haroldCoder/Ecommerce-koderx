import {useUser} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Products } from "../types";
import axios from "axios";
import {MdDelete} from "react-icons/md";
import toast from "react-hot-toast";
import notfound from "../assets/404.webp"

export default function Created() {
    const {user} = useUser();
    const [products, setProducts] = useState<Products[]>([]);

    useEffect(()=>{
        const getProducts = async() =>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}products/author/${user?.fullName}?username=${import.meta.env.VITE_ACCESS}`)
            setProducts(res.data);
        }

        getProducts();
    },[])

    const deleteProduct = async(id: string | undefined) =>{
        await axios.delete(`${import.meta.env.VITE_API_URL}products/${id}?username=${import.meta.env.VITE_ACCESS}`)
        .then(()=>{
            toast.success("Product deleted");
        })
        .catch((err)=>{
            toast.error(err);
        })
    }

  return (
    <div className="h-100 p-24">
        <section className="flex flex-wrap items-center gap-y-9 flex-col ml-5">
            <img src={user?.imageUrl} className="w-52 h-52 rounded-full" alt="you" />
            <h1 className="text-gray-300 text-2xl">{user?.fullName}</h1>
        </section>
        <section className="border-t-[1px] flex-wrap flex gap-8 py-10 border-blue-300 mt-14">
            {
                products.length > 0 ? 
                products.map((e)=>(
                    <div className="w-[30%] items-center flex justify-evenly p-8 bg-gray-900 hover:bg-gradient-to-tr to-black from-blue-600 rounded-md">
                        <div>
                            <img className="w-auto rounded-lg h-24" src={e.imgURI} alt={e.name} />
                        </div>
                        <div className="flex gap-y-5 flex-col flex-wrap items-center">
                           <h2 className="text-white  font-bold">{e.name}</h2> 
                           <button title="delete" onClick={()=>deleteProduct(e._id)} className="rounded-full hover:bg-gray-500 bg-white p-3">
                                <MdDelete />
                           </button>
                        </div>
                    </div> 
                ))
                : 
                <div className="flex justify-center flex-wrap flex-col w-[100%] items-center">
                    <img src={notfound} alt="404" />
                    <h2 className="text-2xl text-gray-400">you haven't created products yet</h2>    
                </div>
            }
        </section>
    </div>
  )
}
