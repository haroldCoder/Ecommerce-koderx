import { useEffect, useRef, useState } from "react"
import { Products } from "../types"
import axios from "axios"

export default function Banner() {
  const [data, setData] = useState<Products[]>([])
  const index = useRef<number>(0);

  useEffect(()=>{
    const getData = async()=>{
      const res : Array<Products> = (await axios.get(`${import.meta.env.VITE_API_URL}products?username=${import.meta.env.VITE_ACCESS}`)).data;
      setData(()=>{
        const transformData = res.
        sort((a: Products, b: Products)=>{return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()})
        .slice(0, 3);

        return transformData;
      })
    }
    
    getData();
  })

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(index.current < 2){
        index.current += 1
      }
      else{
        index.current = 0
      }
    }, 2000)
    
    
      return ()=>{
        clearInterval(timer)
      }
  }, [])

  return (
    <div className="bg-gray-900 flex p-6 mb-12">
      <section className="w-[80%] flex flex-col justify-center items-center">
        <h2 className="text-white mb-6">{data[index.current].name}</h2>
      </section>
      <section>
        {
          data.length > 0 ?
          <>
            <img src={data[index.current].imgURI} className="w-auto rounded-md h-[30vh]" />
          </>
          : null 
        }
      </section>
    </div>
  )
}
