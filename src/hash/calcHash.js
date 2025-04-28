import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import crypto from 'crypto';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = crypto.createHash('sha256');

    const readStream = fs.createReadStream(filePath);

    readStream.on('error', (error) => {
        console.error('FS operation failed');
        process.exit(1);
    });

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        const hashResult = hash.digest('hex');
        console.log(hashResult);
    });
};

await calculateHash();