const { connectToDatabase } = require('../../utils/mongodb');

export default async (req, res) => {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection("menu").find({}).toArray();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'})
    }
}