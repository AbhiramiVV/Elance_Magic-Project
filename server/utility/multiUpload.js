const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  
  })
 
let upload=multer({
    storage: storage
})

const multipleUpload = upload.fields([{ name: 'files', maxCount: 8}])


module.exports=multipleUpload