import { Input, Button, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import uploadToCloudinary from '../services/uploadCloudinary';
import { Products } from '../types';
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';
import toast from 'react-hot-toast/headless';


const SubImages: React.FC<{ image: string; setImg: Dispatch<SetStateAction<{ file: any[]; url: string[]; }>>, index: number }> = ({ image, setImg, index }) => {
  const arrayHandleUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImg((prev) => {
        const newarrayfile = [...prev.file]
        const newarrayurl = [...prev.url]

        newarrayfile[index] = file
        newarrayurl[index] = URL.createObjectURL(file)

        return {
          file: newarrayfile,
          url: newarrayurl
        }
      });

    }
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <Input
          id={`file-input-${index}`}
          type="file"
          style={{ display: 'none' }}
          onChange={arrayHandleUpload}
        />
        <label htmlFor={`file-input-${index}`}>
          <Button
            variant="contained"
            color='info'
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
        </label>
      </Box>
      {
        image && <img className='rounded-md mt-6' src={image} />
      }
    </>
  )
}

export default function Publish() {
  const { user } = useUser();
  const [image, setImage] = useState<{ file: any; url: string }>({
    file: null,
    url: ""
  });
  const [arrayImgs, setArrayImgs] = useState<{ file: Array<any>; url: Array<string> }>({
    file: [],
    url: []
  });
  const [data, setData] = useState<Omit<Products, '_id'>>({
    name: "",
    description: "",
    imgURI: "",
    price: 0,
    author: user?.fullName || "",
    arrayImg: [],
    category: "",
    buys: 0,
    created_at: new Date(),
    key_stripe: ""
  })

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImage((prev) => {
        return {
          ...prev,
          file: file,
          url: URL.createObjectURL(file)
        }
      });
    }

  };

  const SendData = async (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    const urlimg = await uploadToCloudinary(image.file)
    const urlsimgs: Array<string> = []
    arrayImgs.file.map(async (e, index: number) => {
      urlsimgs[index] = await uploadToCloudinary(e).then((e) => { return e.url })
    })
    console.log(urlsimgs);

    setData((prev) => {
      prev.imgURI = urlimg.url
      prev.arrayImg = urlsimgs
      return prev
    })

    axios.post(`${import.meta.env.VITE_API_URL}products?username=${import.meta.env.VITE_ACCESS}`, data)
      .then((res) => {console.log(res); toast.success("Product Created"); setData({
        name: "",
        description: "",
        imgURI: "",
        price: 0,
        author: user?.fullName || "",
        arrayImg: [],
        category: "",
        buys: 0,
        created_at: new Date(),
        key_stripe: ""
      });})
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={SendData} className='p-10 flex w-[95%] justify-between'>
      <section className='w-[60%] flex flex-col gap-6'>
        <div className='border-b-[1px] min-h-[40vh] flex pb-8 items-center gap-6 flex-col w-full border-gray-400'>
          <Box display="flex" alignItems="center">
            <Input
              id="file-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              required
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                color='info'
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
              </Button>
            </label>
          </Box>
          {
            image.url && <img className='rounded-md' src={image.url} />
          }
        </div>
        <h2 className='text-gray-400 text-lg'>aditional images</h2>
        <div className='flex mt-6 gap-5'>
          <div className='border-[1px] p-4 w-[40%] border-gray-400'>
            <SubImages image={arrayImgs.url[0]} setImg={setArrayImgs} index={0} />
          </div>
          <div className='border-[1px] p-4 w-[40%] border-gray-400'>
            <SubImages image={arrayImgs.url[1]} setImg={setArrayImgs} index={1} />
          </div>
          <div className='border-[1px] p-4 w-[40%] border-gray-400'>
            <SubImages image={arrayImgs.url[2]} setImg={setArrayImgs} index={2} />
          </div>
        </div>
      </section>
      <section className='w-[60%] ml-40'>
        <input required onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setData((prev) => {
            prev.name = evt.target.value
            return prev
          })
        }} type="text" placeholder='Name of product' className='decoration-none outline-none border-b-2 bg-transparent p-2 mb-20 text-white border-blue-600 w-full' />
        <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setData((prev) => {
            prev.description = evt.target.value
            return prev
          })
        }} required type="text" placeholder='Description' className='decoration-none outline-none border-b-2 bg-transparent p-2 mb-20 text-white border-blue-600 w-full' />
        <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setData((prev) => {
            prev.price = parseInt(evt.target.value)
            return prev
          })
        }} required type="number" placeholder='Price' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white  border-blue-600 mb-20 w-full' />
        <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setData((prev) => {
            prev.category = evt.target.value
            return prev
          })
        }} required type="text" placeholder='Categorie' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white mb-20 border-blue-600 w-full' />
        <div className='mb-20'>
          <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setData((prev) => {
              prev.key_stripe = evt.target.value
              return prev
            })
          }} required type="text" placeholder='key of Stripe' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white mb-5 border-blue-600 w-full' />
          <p className='text-white ml-3 mb-3'>you not have key stripe <a className='text-blue-500 hover:text-blue-600' target='blank' href="https://dashboard.stripe.com/apikeys">https://dashboard.stripe.com/apikeys</a></p>
        </div>
        <button type='submit' className='px-4 py-2 bg-blue-500 rounded-md text-white w-full hover:bg-blue-700 hover:scale-105'>Create Product</button>
      </section>
    </form>
  );
}
