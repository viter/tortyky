export default function MenuPreview({menu}) {
    console.log('MenuPreview');
    console.log(menu);
    return (
        <>
        <ul>
            {
                menu.map(m => (
                    <li key={m._id}>{m.name}</li>
                ))
            }
        </ul>
        </>
    );
}