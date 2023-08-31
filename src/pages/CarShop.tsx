import { useEffect, useState } from 'react'
import { carShop, productShop } from '../types'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'

export default function CarShop() {
    const [reserve, setReserve] = useState<productShop[]>([])
    const { user } = useUser();

    useEffect(() => {
        const getData = async () => {
            const res: carShop = (await axios.get(`${import.meta.env.VITE_API_URL}carshop/${user?.fullName}?username=${import.meta.env.VITE_ACCESS}`)).data;
            await axios.post(`${import.meta.env.VITE_API_URL}carshop-ids?username=${import.meta.env.VITE_ACCESS}`,{
                arrayids: res.products
            })
            .then((res)=>setReserve(res.data))
        };
        getData();
      }, []);

      const payProduct = async(key_stripe: string, price: number, name: string) =>{
        await axios.post(`https://stripe-node-microservice.vercel.app/api/stripe`,{
            api_key_stripe: key_stripe,
            mode: "payment",
            price: price,
            quantity: 1,
            currency: 'usd',
            name: name,
            success_url: location.href,
            cancel_url: location.href
        }).then((res)=>location.href = res.data)
        .catch((err)=>console.log(err))
      }

      const RemovefromCarshop = async(id: string | undefined) =>{
        console.log(id);
        
        await axios.delete(`${import.meta.env.VITE_API_URL}carshop/${id}/${user?.fullName}?username=${import.meta.env.VITE_ACCESS}`)
        .then(()=>alert("product remove"))
        .catch((err)=>console.log(err))
      }

    return (
        <div className="mx-[20%]">
        {
          reserve ?
          reserve.map((e) => (
            <div className="flex justify-between mt-10 cursor-pointer hover:bg-slate-700 hover:scale-105 duration-150 p-3 items-center rounded-md bg-slate-800">
              <section className="cursor-pointer items-center  w-full flex gap-x-4 ">
                <div className="p-2">
                  <img src={e.imgURI} className="h-[10vh] rounded-md" alt={e.name} />
                </div>
                <div>
                  <h2 className="text-white mb-2">{e.name}</h2>
                  <p className='text-green-400'>{e.price} $</p>
                </div>
              </section>
              <section className="flex gap-x-8">
                <button className="bg-green-600 hover:bg-green-700 p-2 rounded-md w-24 h-10 text-white" onClick={()=>payProduct(e.key_stripe, e.price, e.name)}>Pay now</button>
                <button onClick={()=>RemovefromCarshop(e.id)} className="bg-red-600 hover:bg-red-800 p-2 rounded-md w-24 h-10 text-white">Cancel</button>
              </section>
            </div>
          ))
          : null
        }
    </div>
    )
}
