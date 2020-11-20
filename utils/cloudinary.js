const { __esModule } = require('cloudinary-react/lib/components/CloudinaryContext');

const cl = require('cloudinary').v2;

cl.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {cl};