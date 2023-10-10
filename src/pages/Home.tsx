import { Dispatch, useEffect, SetStateAction } from 'react';
import Banner from '../components/Banner'
import { Products } from '../types';
import axios from 'axios';
import CardProducts from '../components/CardProducts';

export default function Home({data, setData, change}: {data: Products[], setData: Dispatch<SetStateAction<Products[]>>, change: boolean}) {

  useEffect(() => {
    const getProducts = async () => {
      const res: Products[] = (await axios.get(`${import.meta.env.VITE_API_URL}products?username=${import.meta.env.VITE_ACCESS}`)).data;
      !change ?
      setData(() => {
        const transformedData = res.map((e: Products) => ({
          ...e,
          created_at: new Date(e.created_at)
        }));

        return transformedData;
      })
      : null
    }
    
    getProducts();
  }, [change]);
  

  return (
    <div>
      <Banner />
      <section className='flex flex-wrap max-sm:grid grid-cols-1 max-sm:p-8 justify-between'>
        {
          data.sort((a: Products, b: Products)=>{return b.created_at.getTime() - a.created_at.getTime()}).map((dt: Products)=>(
            <CardProducts id={dt._id!} name={dt.name} description={dt.description} imgURI={dt.imgURI} price={dt.price} />
          ))
        }
      </section>
    </div>
  )
}
