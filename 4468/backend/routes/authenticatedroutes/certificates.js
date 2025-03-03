const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const router = express.Router();
const UserCertificates = require("../../models/UserCertificates");
const File = require("../../models/FileModel");


const ENCRYPTION_KEY = Buffer.from(process.env.FILE_ENCRYPTION_KEY, "hex");
const IV_LENGTH = 16; 


function encryptBuffer(buffer) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]); // Prepend IV to the encrypted data
}

// Function to decrypt a buffer
function decryptBuffer(encryptedBuffer) {
  const iv = encryptedBuffer.slice(0, IV_LENGTH); // Extract IV from the beginning
  const encryptedData = encryptedBuffer.slice(IV_LENGTH);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  return decrypted;
}

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * @route   POST /certificates/upload/:field
 * @desc    Upload and store an individual file
 */
router.post("/certificates/upload/:field", upload.single("file"), async (req, res) => {
  try {
    const { field } = req.params;
    const email = req.email;
    if (!email || !field) return res.status(400).json({ error: "Email and field name are required." });
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const fileData = fs.readFileSync(req.file.path);
    const encryptedFileData = encryptBuffer(fileData); // Encrypt the file buffer

    const fileDocument = new File({
      file: encryptedFileData, // Store the encrypted buffer
      size: req.file.size,
    });
    await fileDocument.save();

    const userCert = await UserCertificates.findOne({ email });

    if (!userCert) {
      const newUserCert = new UserCertificates({ email });
      newUserCert.set(field, { originalName: req.file.originalname, ref: fileDocument._id });
      await newUserCert.save();
    } else {
      userCert.set(field, { originalName: req.file.originalname, ref: fileDocument._id });
      await userCert.save();
    }

    fs.unlinkSync(req.file.path);
    return res.status(200).json({ message: "File uploaded successfully.", file: fileDocument });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Server error while uploading file." });
  }
});

/**
 * @route   GET /certificates/:email
 * @desc    Retrieve all files for a user
 */
router.get("/certificates", async (req, res) => {
  try {
    const  email  = req.email;
    if (!email) return res.status(400).json({ error: "Email is required." });

    const userCert = await UserCertificates.findOne({ email }).populate("photo signature 10th inter diploma ug1 ug2 pg1 pg2.ref");
    if (!userCert) return res.status(404).json({ error: "No files found for this user." });

    return res.status(200).json({ certificates: userCert });
  } catch (error) {
    console.error("Error retrieving files:", error);
    return res.status(500).json({ error: "Server error while fetching files." });
  }
});

// get individual file

router.get("/certificates/:field", async (req, res) => {
  try {
    const { field } = req.params;
    const email = req.email;
    if (!email || !field) return res.status(400).json({ error: "Email and field name are required." });

    const userCert = await UserCertificates.findOne({ email }).populate(field);
    if (!userCert || !userCert[field]) return res.status(404).json({ error: "File not found for this user." });

    const fileId = userCert[field].ref;
    const file = await File.findById(fileId);
    if (!file || !file.file) return res.status(404).json({ error: "File data not found." });

    const decryptedFileData = decryptBuffer(file.file); // Decrypt the file buffer

    // Detect MIME type based on file signature
    const mimeType = decryptedFileData.toString("hex", 0, 4) === "89504e47" ? "image/png" : "image/jpeg";

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `inline; filename="${userCert[field].originalName}"`);
    
    return res.send(decryptedFileData); // Send the decrypted file
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ error: "Server error while fetching file." });
  }
});

/**
 * @route   PUT /certificates/:email/:field
 * @desc    Update an existing file
 */
router.put("/certificates/:field", upload.single("file"), async (req, res) => {
  try {
    const { field } = req.params;
    const email = req.email;
    if (!req.file) return res.status(400).json({ error: "No file provided." });

    const userCert = await UserCertificates.findOne({ email });
    if (!userCert || !userCert[field]) return res.status(404).json({ error: "File not found for this user." });

    const fileData = fs.readFileSync(req.file.path);
    const encryptedFileData = encryptBuffer(fileData); // Encrypt the file buffer

    const updatedFile = await File.findByIdAndUpdate(
      userCert[field].ref,
      { file: encryptedFileData, size: req.file.size, uploadedAt: new Date() },
      { new: true }
    );

    userCert[field].originalName = req.file.originalname;
    await userCert.save();

    fs.unlinkSync(req.file.path);
    return res.status(200).json({ message: "File updated successfully.", file: updatedFile });
  } catch (error) {
    console.error("Error updating file:", error);
    return res.status(500).json({ error: "Server error while updating file." });
  }
});

/**
 * @route   DELETE /certificates/:email/:field
 * @desc    Delete a specific file
 */
router.delete("/certificates/:field", async (req, res) => {
  try {
    const { field } = req.params;
    const email = req.email;

    const userCert = await UserCertificates.findOne({ email });
    if (!userCert || !userCert[field]) return res.status(404).json({ error: "File not found." });

    await File.findByIdAndDelete(userCert[field].ref);
    userCert.set(field, undefined);
    await userCert.save();

    return res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ error: "Server error while deleting file." });
  }
});

module.exports = router;
