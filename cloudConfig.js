const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name :'dj0i2gom8',
    api_key:'822541756725461',
    api_secret :'u1a_MPOTek_zHiQ0OmwdqionwSw'
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Edushine Assests',
      allowedFormats : ["png","jpg","jpeg"]
    },
  });
  module.exports = {
    cloudinary,
    storage,
  }