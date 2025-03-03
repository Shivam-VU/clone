const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const Question = require("../../models/Question");
const QuestionBank = require("../../models/QuestionBank");
const File = require("../../models/FileModel");
const xlsx = require("xlsx");

const router = express.Router();

const ENCRYPTION_KEY = Buffer.from(process.env.FILE_ENCRYPTION_KEY, "hex");
const IV_LENGTH = 16;

function encryptBuffer(buffer) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
}

function decryptBuffer(encryptedBuffer) {
  const iv = encryptedBuffer.slice(0, IV_LENGTH);
  const encryptedData = encryptedBuffer.slice(IV_LENGTH);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-question-bank", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

    if (sheetData.length === 0) return res.status(400).json({ error: "Excel file is empty." });

    sheetData.sort((a, b) => a.qno - b.qno);
    const questionBank = new QuestionBank({ name: `QuestionBank_${Date.now()}`, questions: [] });

    for (const row of sheetData) {
      const newQuestion = new Question({
        examtype: row.examtype,
        quesubject: row.quesubject,
        queunit: row.queunit,
        que_type: row.que_type,
        que_level: row.que_level,
        qno: row.qno,
        questiondesc: row.questiondesc,
        option1: row.option1,
        option2: row.option2,
        option3: row.option3,
        option4: row.option4,
        answer: row.answer,
        qtimesec: row.qtimesec,
        qmarks: row.qmarks,
        queyear: row.queyear,
      });
      const savedQuestion = await newQuestion.save();
      questionBank.questions.push(savedQuestion._id);
    }
    await questionBank.save();
    return res.status(201).json({ message: "Question bank created successfully", questionBank });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "Server error while processing the file." });
  }
});

/**
 * @route GET /api/question-banks
 * @desc Get all question banks
 * @access Public
 */
router.get("/question-banks", async (req, res) => {
    try {
        const questionBanks = await QuestionBank.find().populate("questions");
        return res.status(200).json(questionBanks);
    } catch (error) {
        console.error("Error fetching question banks:", error);
        return res.status(500).json({ error: "Server error while fetching question banks." });
    }
});

/**
 * @route GET /api/question-banks/:id
 * @desc Get a single question bank by ID
 * @access Public
 */
router.get("/question-banks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const questionBank = await QuestionBank.findById(id).populate("questions");

        if (!questionBank) {
            return res.status(404).json({ error: "Question bank not found." });
        }

        return res.status(200).json(questionBank);
    } catch (error) {
        console.error("Error fetching question bank:", error);
        return res.status(500).json({ error: "Server error while fetching question bank." });
    }
});

router.post("/question-banks/upload-image/:questionId/:field", upload.single("file"), async (req, res) => {
  try {
    const { questionId, field } = req.params;
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    // Validate field name
    const validFields = ["questiondesc", "option1", "option2", "option3", "option4"];
    if (!validFields.includes(field)) {
      return res.status(400).json({ error: "Invalid field name." });
    }

    // Encrypt and store the file
    const encryptedFile = encryptBuffer(req.file.buffer);
    const fileDoc = new File({ file: encryptedFile, size: req.file.size });
    await fileDoc.save();

    // Create a reference to the uploaded file
    const fileRef = {
      originalName:  "manual_image",
      ref: fileDoc._id
    };

    // Find and update the question
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found." });

    question[field] = fileRef;
    await question.save();

    return res.status(200).json({ message: "File uploaded successfully.", fileId: fileDoc._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Server error while uploading file." });
  }
});
router.get("/question-banks/image/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const fileDoc = await File.findById(fileId);
    if (!fileDoc) return res.status(404).json({ error: "File not found." });

    const decryptedData = decryptBuffer(fileDoc.file);
    res.setHeader("Content-Type", "image/jpeg");
    return res.send(decryptedData);
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ error: "Server error while fetching file." });
  }
});

router.delete("/question-banks/delete-image/:questionId/:field", async (req, res) => {
  try {
    const { questionId, field } = req.params;
    if (!["questiondesc", "option1", "option2", "option3", "option4"].includes(field)) {
      return res.status(400).json({ error: "Invalid field name." });
    }



    const question = await Question.findById(questionId);
    if (!question || !question[field]) return res.status(404).json({ error: "File not found." });

    await File.findByIdAndDelete(question[field].ref);
    question[field] = "manual_image";
    await question.save();

    return res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ error: "Server error while deleting file." });
  }
});

module.exports = router;
