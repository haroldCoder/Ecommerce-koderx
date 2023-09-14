import { useEffect, useRef, useState } from "react"
import { Products } from "../types"
import axios from "axios"
import american from '../assets/american.png'
import diner from '../assets/diner.png'
import jcb from '../assets/jcb.png'
import mastercard from '../assets/mastercard.png'
import visa from '../assets/visa.png'

export default function Banner() {
  const [data, setData] = useState<Products[]>([])
  const index = useRef<number>(0);

  useEffect(() => {
    const getData = async () => {
      const res: Array<Products> = (await axios.get(`${import.meta.env.VITE_API_URL}products?username=${import.meta.env.VITE_ACCESS}`)).data;
      setData(() => {
        const transformData = res.
          sort((a: Products, b: Products) => { return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() })
          .slice(0, 3);

        return transformData;
      })
    }

    getData();
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (index.current < 2) {
        index.current += 1
      }
      else {
        index.current = 0
      }
    }, 3000)


    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="bg-gray-900 flex p-6 mb-12">
      {
        data.length > 0 ?
          <>
            <section className="w-[80%] flex flex-col items-center animate-ease-in">
              <h2 style={{fontFamily: "'Francois One', sans-serif"}} className="text-4xl max-sm:text-lg bg-clip-text text-transparent bg-gradient-to-tr to-blue-500 via-blue-400 font-bold from-gray-900 mb-6">{data[index.current].name}</h2>
              <div className="px-4 py-2 bg-gray-900 opacity-50 text-white text-3xl from-white">
                <h4 className="text-center max-sm:text-lg">{data[index.current].price} $</h4>
              </div>

              <footer className="mt-12 flex justify-between max-sm:mt-24 max-sm:w-[19%] w-[50%]">
                  <img src={visa} className="w-auto h-12 hover:scale-105 opacity-60" />
                  <img src={mastercard} className="w-auto h-12 hover:scale-105 opacity-60" />
                  <img src={jcb} className="w-auto h-12 hover:scale-105 opacity-60" />
                  <img src={american} className="w-auto hover:scale-105 h-12 opacity-60" />
                  <img src={diner} className="w-auto h-12 hover:scale-105 opacity-60" />
              </footer>
            </section>
            <section className="animate-pulse animate-infinite animate-duration-[3000ms] animate-delay-[3000ms] animate-ease-in">
              <img src={data[index.current].imgURI} className="w-auto rounded-md h-[30vh]" />
            </section>
          </>
          : null
      }
      
    </div>
  )
}
