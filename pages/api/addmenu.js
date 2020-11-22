const { connectToDatabase } = require('../../utils/mongodb');

export default async (req, res) => {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection("menu").insertOne({
            name: req.body.name,
            hasSubmenu: req.body.hasSubmenu,
            parent: req.body.parent
        });
        console.log(result.insertedCount);
        res.json({msg: 'Succsess'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'})
    }
}