export default function AddMenu() {

    const handleSubmitForm = () => {

    }

    return (
        <>
            <div className='w-full max-w-xs'>
                <form onSubmit={handleSubmitForm} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className="mb-4">
                        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Ім'я</label>
                        <input
                            type='text'
                            name='name'
                            className='border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                        />
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3"></div>
                        <label className="md:w-2/3 block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox"/>
                                <span className="text-sm">
                                Має підменю
                                </span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Ім'я</label>
                        <select
                            type='text'
                            name='name'
                            className='border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                        />
                    </div>
                    <div className="mt-4 flex items-center">
                        <button className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}