import express from 'express'
import multer from 'multer'
import path from 'path'
// https://www.npmjs.com/package/multer

const router = express.Router()

const storage = multer.diskStorage({
  // where save files
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  // single files. make sure they have diffrent names
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      // path.extname(file.originalname
      // will pull up format of the file .jpg .png
    )
  },
})

// function to check if uploding images are jpg, png
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true) //null for no errors
  } else {
    cb('Images only!') // error
  }
}

// middlewere to check format type
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
