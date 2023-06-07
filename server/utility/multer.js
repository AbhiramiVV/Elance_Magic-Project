const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
    }
  })
  
  const upload = multer({ storage: storage })
  const multiUpload = upload.fields([{ name: 'Image' }, { name: 'gallery', maxCount: 8 }])
  module.exports=multiUpload;
