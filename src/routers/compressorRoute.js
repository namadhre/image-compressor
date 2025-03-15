import express from 'express' ;
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import compressService from '../services/compressService.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post("/", upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a CSV file" });
  }
  
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      fs.unlinkSync(req.file.path);
      const uniqueId = await compressService.create(results);
      res.json({ message: "File processed successfully", uniqueRequestId: uniqueId });
    });
});

export default router;