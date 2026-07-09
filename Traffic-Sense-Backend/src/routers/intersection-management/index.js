const express = require("express");
const multer = require("multer");

const signalManagementController = require("../../controllers/intersection-management");
const authenticateUser = require("../../middleware/authentication");

const router = new express.Router();
// Configure storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Customize the file name
  }
});
const upload = multer({ storage: storage });

router.post(
  "/manage-signals",
  // authenticateUser,
  upload.array("files"),
  signalManagementController.manageSignals
);

router.post(
  "/register/intersection",
  // authenticateUser,
  signalManagementController.registerIntersectionFunc
)

module.exports = router;
