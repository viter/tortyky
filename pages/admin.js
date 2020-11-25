import AddMenu from "../components/addmenu";
import AdminCategory from "../components/category";
const { connectToDatabase } = require('../utils/mongodb');

export default function Admin({category, menu}) {
    return (
        <>
            <div className="border-b ml-4 mr-4 pb-2 text-teal-800 border-teal-900">
                <p className='text-4xl '>Меню</p>
                <AddMenu menu={menu} className='w-full'/>
            </div>
            <div className="border-b text-4xl ml-4 mr-4 pb-2 text-teal-800 border-teal-900">
                Категорії
            </div>
            <div className='flex m-4 pb-2 text-center'>
                <AdminCategory category={category}/>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const categories = await db
        .collection("categories")
        .find({})
        .toArray();
    const menu = await db
        .collection("menu")
        .find({})
        .toArray();

    return {
        props: {
            category: JSON.parse(JSON.stringify(categories)),
            menu: JSON.parse(JSON.stringify(menu))
        },
    };
}