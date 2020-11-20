import { useState } from "react";

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState('');

    const handleFileInputChange = e => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmitFile = e => {
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);
        try {
            await fetch('api/upload', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='text-4xl'>Upload</div>
            <form onSubmit={handleSubmitFile}>
                <div className="mt-4 flex items-center">
                    <input 
                        type='file' 
                        name='image' 
                        onChange={handleFileInputChange} 
                        value={fileInputState} 
                        className='form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                    />
                </div>
                <div className="mt-4 flex items-center">
                    <button className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out' type='submit'>Submit</button>
                </div>
            </form>
            <div className="mt-4 flex items-center">
            {previewSource && (
                <img src={previewSource} alt='chosen' style={{height: '300px'}}/>
            )}
            </div>
        </div>
    );
}