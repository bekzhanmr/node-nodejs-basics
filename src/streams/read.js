import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { pipeline } from 'stream/promises';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    try {
        const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

        const readStream = fs.createReadStream(filePath);

        await pipeline(readStream, process.stdout);
    } catch {
        console.error('FS operation failed');
        process.exit(1);
    }
};

await read();