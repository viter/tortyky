const { connectToDatabase } = require('../../utils/mongodb');
const { ObjectId } = require('mongodb');


export default async (req, res) => {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection("menu").insertOne({
            name: req.body.name,
            hasSubmenu: req.body.hasSubmenu,
            parent: req.body.parent,
            submenus: []
        });
        if(req.body.parent != 'root') {
            const updateResult = await db.collection("menu").findOneAndUpdate(
                { _id: new ObjectId(req.body.parent) },
                { $push: {submenus: result.insertedId} }
            );
        }
        res.json({msg: 'Succsess'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'})
    }
}