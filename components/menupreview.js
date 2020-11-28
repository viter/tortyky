export default function MenuPreview({menu}) {
    const submenus = [];
    return (
        <>
        <ul>
            {
                menu.filter(m => m.parent == 'root').map(m => {
                    if(!m.hasSubmenu)
                       return <li key={m._id}>{m.name}</li>
                    else
                       return (
                        <>
                        <li key={m._id}>{m.name}</li>
                        <div className='pl-5'> 
                            {
                                m.submenus.map(ms => {
                                    const submenu = menu.find(el => el._id === ms);
                                    return <li key={submenu._id}>{submenu.name}</li>;
                                })
                            }
                        </div>
                        </>
                        )
                })
            }
        </ul>
        </>
    );
}
