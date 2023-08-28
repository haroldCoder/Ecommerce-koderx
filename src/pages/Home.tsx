import { useEffect, useState } from 'react';
import Banner from '../components/Banner'
import { Products } from '../types';
import axios from 'axios';
import CardProducts from '../components/CardProducts';

export default function Home() {
  const [data, setData] = useState<Products[]>([]);

  useEffect(()=>{
    const getProducts = async() =>{
      const res : Products[] = (await axios.get(`${import.meta.env.VITE_API_URL}products?username=${import.meta.env.VITE_ACCESS}`)).data;
      setData(() => {
        const transformedData = res.map((e : Products) => ({
          ...e,
          created_at: new Date(e.created_at)
        }));
      
        return transformedData;
      });
      
      
    }
    getProducts();
    console.log(data);
  }, [])

  return (
    <div>
      <Banner />
      <section className='flex flex-wrap justify-between'>
        {
          data.sort((a: Products, b: Products)=>{return b.created_at.getTime() - a.created_at.getTime()}).map((dt: Products)=>(
            <CardProducts id={dt._id!} name={dt.name} description={dt.description} imgURI={dt.imgURI} price={dt.price} />
          ))
        }
      </section>
    </div>
  )
}
