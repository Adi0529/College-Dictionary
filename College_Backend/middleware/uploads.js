const multer = require("multer");
const path = require("path");
const fs = require("fs");


const createFolder = (folder) => {

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

};


const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (file.fieldname === "profileImage") {

            createFolder("uploads/users");

            cb(null, "uploads/users");

        }

        else if (file.fieldname === "thumbnail") {

            createFolder("uploads/colleges/thumbnail");

            cb(null, "uploads/colleges/thumbnail");

        }

        else if (file.fieldname === "images") {

            createFolder("uploads/colleges/images");

            cb(null, "uploads/colleges/images");

        }

        else {

            cb(new Error("Invalid field name"));

        }

    },


    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 100000) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});


const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {

        return cb(null, true);

    }

    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));

};


const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});


module.exports = upload;