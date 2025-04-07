

export const uploadImgCloudinary = async (file) => {
    const url = 'https://api.cloudinary.com/v1_1/dihvpggmx/image/upload';
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'astor-preset');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      throw new Error('Error al subir imagen', error);
    }
  };