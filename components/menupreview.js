export default function MenuPreview({menu}) {
    const submenus = [];
    return (
        <>
        
            {
                menu.filter(m => m.parent == 'root').map(m => {
                    if(!m.hasSubmenu)
                       return (
                           <p className='flex items-center'>{m.name}
                               <svg className='h-5 w-5 ml-5 text-purple-500 fill-current' viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </p>
                        )
                    else
                       return (
                        <>
                        <p>{m.name}</p>
                        <div className='pl-5'> 
                            {
                                m.submenus.map(ms => {
                                    const submenu = menu.find(el => el._id === ms);
                                    return <p>{submenu.name}</p>;
                                })
                            }
                        </div>
                        </>
                        )
                })
            }
        
        </>
    );
}
