export default function MenuPreview({menu}) {
    const submenus = [];

    const removeMenuItem = e => {
        const mid = e.target.getAttribute('data-value');

    }

    return (
        <>
        
            {
                menu.filter(m => m.parent == 'root').map(m => {
                    if(!m.hasSubmenu)
                       return (
                        <div key={m._id} className='flex w-full items-center hover:bg-blue-100'>
                           <p className='cursor-pointer w-2/4'>{m.name}</p>
                           <svg data-value={m._id} onClick={removeMenuItem} className='w-full h-5 w-5 ml-5 text-purple-500 fill-current cursor-pointer' viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </div>
                        )
                    else
                       return (
                        <div key={m._id}>
                        {
                         m.submenus.length > 0 
                            ? <p>{m.name}</p>
                            : 
                            <div className='flex w-full items-center hover:bg-blue-100'>
                                <p className='items-center w-2/4'>{m.name}</p>
                                <svg data-value={m._id} onClick={removeMenuItem} className='w-full h-5 w-5 ml-5 text-purple-500 fill-current  cursor-pointer' viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            </div>
                        }
                        <div className='pl-5'> 
                            {
                                m.submenus.map(ms => {
                                    const submenu = menu.find(el => el._id === ms);
                                    return (
                                    <div key={submenu._id} className='flex w-full items-center hover:bg-blue-100'>
                                        <p className='flex items-center cursor-pointer  w-2/4'>{submenu.name}</p>
                                        <svg data-value={submenu._id} onClick={removeMenuItem} className='-ml-0 w-full h-5 w-5 ml-5 text-purple-500 fill-current cursor-pointer' viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        </div>
                        )
                })
            }
        
        </>
    );
}
