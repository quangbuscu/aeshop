const express = require("express");
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: './src/public/uploads/',
        filename: function ( req, file, cb ) {
            cb( null, Date.now()+".png");
        }
    }
);

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            return cb("File phải là ảnh", false);
        } else {
            cb(null, true);
        }
    },
    limits: {
        files: 3,
    }
})

/**
 * Routing for Auth
 */
const ProductController = require("../controllers/ProductController");
const controller = new ProductController();

router.get("/", (req, res) => controller.listProduct(req, res));

router.get("/add-product", (req, res) => controller.addProduct(req, res));

router.post("/add-product", upload.array('pictureProduct', 3), (req, res) => controller.addProductFinal(req, res));

//  router.post("/login", (req, res) => controller.loginFinal(req, res));a

module.exports = router;