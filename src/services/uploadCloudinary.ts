import axios from "axios";

const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_KEY as string);
      formData.append("folder", "Sales")
      formData.append('upload_preset', import.meta.env.VITE_UPLOAD as string); // Reemplaza TU_PRESET_DE_SUBIDA con tu propio preset de subida en Cloudinary
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/coderx/image/upload', // Reemplaza TU_CLOUD_NAME con tu propio nombre de cloud en Cloudinary
        formData
      );
  
      // Aquí puedes realizar acciones con los datos de respuesta
      return response.data
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  export default uploadToCloudinary;