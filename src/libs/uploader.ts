import ky from 'ky'

import {
  VITE_CLOUDINARY_API_KEY,
  VITE_CLOUDINARY_API_URL,
  VITE_CLOUDINARY_SECRET_KEY,
  VITE_CLOUDINARY_UPLOAD_PRESET,
} from '@/constants/envs'

const uploadImage = async (asset: File) => {
  if (!asset) return null

  const formData = new FormData()
  formData.append('file', asset)
  formData.append('api_key', VITE_CLOUDINARY_API_KEY)
  formData.append('secret_key', VITE_CLOUDINARY_SECRET_KEY)
  formData.append('upload_preset', VITE_CLOUDINARY_UPLOAD_PRESET)
  formData.append('timestamp', String(Date.now()))

  try {
    const response = await ky(VITE_CLOUDINARY_API_URL, {
      method: 'POST',
      body: formData,
    })
    return response.json() as any as { secure_url: string }
  } catch (error) {
    console.log('Upload error, ', error)
    return null
  }
}

export { uploadImage }
