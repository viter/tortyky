const { cl } = require('../../utils/cloudinary');
const { connectToDatabase } = require('../../utils/mongodb');

export default async (req, res) => {
    try {
        const { db } = await connectToDatabase();
        const fileStr = req.body.data;
        const uploadedResponse = await cl.uploader.upload(fileStr, {
            upload_preset: 'tortyky'
        });
        console.log(uploadedResponse);
        const result = await db.collection("img").insertOne({
            category: 'test',
            name: uploadedResponse.public_id
        });
        console.log(result.insertedCount);
        res.json({msg: 'Succsess'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb'
        }
    }
}
