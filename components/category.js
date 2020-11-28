import Image from 'next/image';
export default function AdminCategory({category}) {
    console.log(category);
    return (
        <div className='flex mt-5 mb-5'>
        
        {category.map(element => (
            <div className='bg-white shadow-lg mr-4 rounded-lg overflow-hidden' key={element._id} id={element._id}>
                <Image src={element.img} width={200} height={150}/>
            <div className='text-2xl text-center p-4'>{element.name}</div>
            </div>
        ))}
            
        </div>
    );
}
