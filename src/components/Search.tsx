import axios from 'axios';
import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import { Products } from '../types';

export default function Search({ setData, change }: { setData: React.Dispatch<React.SetStateAction<Products[]>>, change: React.MutableRefObject<boolean> }) {
    const [search, setSearch] = useState<string>("");

    const Search = (event: React.KeyboardEvent<HTMLDivElement>) =>{
        if(event.key == "Enter"){
            axios.get(`${import.meta.env.VITE_API_URL}products/search/${search}?username=${import.meta.env.VITE_ACCESS}`)
            .then((res)=>{
              change.current = true;
              setData(() => {
                return res.data.map((e: Products) => ({
                    ...e,
                    created_at: new Date(e.created_at)
                }))
            })
              setSearch("");
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    }

  return (
    <div onKeyUp={Search} className='bg-gray-600 w-[70%] hover:scale-105 items-center px-2 flex justify-between text-white rounded-md hover:bg-gray-500'>
        <input onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='search by termn' className='w-[80%] decoration-0 outline-none bg-transparent p-1' />
        <BsSearch style={{fontSize: "14px"}} />
    </div>
  )
}
