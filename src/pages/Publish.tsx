import { Input, Button, Typography, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import uploadToCloudinary from '../services/uploadCloudinary';
import { Products } from '../types';

export default function Publish() {

  const [image, setImage] = useState<string>("");

  const [data, setData] = useState<Omit<Products, 'id'>>({
    name: "",
    description: "",
    imgURI: "",
    price: 0,
    author: "",
    arraImg: [],
    category: "",
    buys: 0,
    created_at: new Date()
  })

  const handleFileUpload = async(event: any) => {

    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='p-10 flex w-[75%] justify-between'>
      <section className='w-[40%] flex items-center gap-6 flex-col '>
        <Box display="flex" alignItems="center">
          <Input
            id="file-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
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
          image && <img className='rounded-md' src={image} />
        }
      </section>
      <section className='w-[60%] ml-40'>
        <input type="text" placeholder='Name of product' className='decoration-none outline-none border-b-2 bg-transparent p-2 mb-20 text-white border-blue-600 w-full' />
        <input type="text" placeholder='Description' className='decoration-none outline-none border-b-2 bg-transparent p-2 mb-20 text-white border-blue-600 w-full' />
        <input type="number" placeholder='Price' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white  border-blue-600 mb-20 w-full' />
        <input type="text" placeholder='Categorie' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white mb-20 border-blue-600 w-full' />

        <button className='px-4 py-2 bg-blue-500 rounded-md text-white w-full hover:bg-blue-700 hover:scale-105'>Create Product</button>
      </section>
    </div>
  );
}
