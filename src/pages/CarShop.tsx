import React, { useEffect, useMemo, useRef, useState } from 'react'
import { carShop, productShop } from '../types'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'

export default function CarShop() {
    const [reserve, setReserve] = useState<productShop[]>([])
    const { user } = useUser();

    useEffect(() => {
        const getData = async () => {
            const res: carShop = (await axios.get(`${import.meta.env.VITE_API_URL}carshop/${user?.firstName}?username=${import.meta.env.VITE_ACCESS}`)).data;
            await axios.post(`${import.meta.env.VITE_API_URL}carshop-ids?username=${import.meta.env.VITE_ACCESS}`,{
                arrayids: res.products
            })
            .then((res)=>setReserve(res.data))
        };
        getData();
      }, []);

    return (
        <div className="mx-[20%]">
        {
          reserve ?
          reserve.map((e) => (
            <div className="flex justify-between mt-10 p-3 items-center rounded-md bg-slate-800">
              <section className="cursor-pointer items-center  w-full flex gap-x-4 ">
                <div className="p-2">
                  <img src={e.imgURI} className="h-[10vh] rounded-md" alt={e.name} />
                </div>
                <div>
                  <h2 className="text-white">{e.name}</h2>
                </div>
              </section>
              <section className="flex gap-x-8">
                <button className="bg-green-600 p-2 rounded-md w-24 h-10 text-white">Pay now</button>
                <button className="bg-red-600 p-2 rounded-md w-24 h-10 text-white">Cancel</button>
              </section>
            </div>
          ))
          : null
        }
    </div>
    )
}
