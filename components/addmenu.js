import { checkbox } from "@tailwindcss/custom-forms/src/defaultOptions";
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import MenuPreview from "./menupreview";

export default function AddMenu({menu}) {
    const [hasSubmenu, setHasSubmenu] = useState(false);
    const [name, setName] = useState('');
    const [parent, setParent] = useState('root');
    const [fetchedMenu, setFetchedMenu] = useState([]);

    let menulist = fetchedMenu.length ? fetchedMenu : menu;

    const handleSubmitForm = e => {
        e.preventDefault();
        const data = {
            name,
            hasSubmenu,
            parent
        }
        addMenu(data);
    }

    console.log('m1');
    console.log(menu);

    const addMenu = async (data) => {
        try {
            await fetch('api/addmenu', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-type': 'application/json'}
            });
            const m = await fetch('api/getmenu');
            const fetchedmenu = await m.json();
            console.log('m2');
            console.log(menu)
            setFetchedMenu(fetchedmenu);
        } catch (error) {
            console.log(error);
        }
    }

    const checkboxClicked = () => {
        setHasSubmenu(!hasSubmenu);
        setParent('root');
    }

    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleSelectCange = e => {
        setParent(e.target.value);
    }

    return (
        <>
            <div className='flex max-w-xs w-full'>
                <form onSubmit={handleSubmitForm} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className="mb-4">
                        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Ім'я</label>
                        <input
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                            className='border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-600'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="md:w-2/3 block text-gray-500 font-bold">
                        <input  
                            className="form-checkbox mr-2 border leading-tight text-green-500" type="checkbox" 
                            value={hasSubmenu}
                            onClick={checkboxClicked}
                        />
                        <span className="text-sm">
                            Має підменю
                        </span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Міститься в меню</label>
                        <select
                            value={parent}
                            onChange={handleSelectCange}
                            className='border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-600'
                            disabled={hasSubmenu}>
                                <option value='root'>Головне</option>
                                {
                                    menulist.filter(m => m.hasSubmenu)
                                    .map(m => (
                                    <option key={m._id} value={m._id}>{m.name}</option>
                                    ))
                                }
                        </select>
                    </div>
                    <div className="mt-4 flex items-center">
                        <button className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out' type='submit'>Додати</button>
                    </div>
                    
                </form>
                <div className='bg-blue-200 w-full'>
                    <MenuPreview menu={menu}/>
                </div>
            </div>
        </>
    );
}