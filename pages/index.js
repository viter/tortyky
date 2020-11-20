import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import Upload from '../components/upload';

export default function Home() {
  return (
    <div className='md:flex bg-white rounded-lg p-24 justify-center'>
      
      <Upload />
    </div>
  );
}