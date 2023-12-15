const multer = require("multer");

const storage = multer.diskStorage({
    destination: '../public/assets/categorias',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        }
})

module.exports = multer;