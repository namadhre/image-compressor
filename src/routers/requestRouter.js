import express from 'express' ;
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import requestService from '../services/requestService.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/status/:uniqueId', async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const { csv } = await requestService.getStatus(uniqueId);
    const filePath = path.join(__dirname, `../status_${uniqueId}.csv`);
    fs.writeFileSync(filePath, csv);

    // Send CSV as response
    res.setHeader('Content-Disposition', `attachment; filename="status_${uniqueId}.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    console.log('success');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // After response is sent, delete the file
    fileStream.on('end', () => {
        fs.unlink(filePath, (err) => {
            if (err) console.error(`Failed to delete file: ${err}`);
        });
    });

  } catch (err) {
    return res.status(404).json(err.message);
  }
});

export default router;