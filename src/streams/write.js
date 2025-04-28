import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    try {
        const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

        const writeStream = fs.createWriteStream(filePath);

        writeStream.on('error', (error) => {
            console.error('FS operation failed');
            process.exit(1);
        });

        await pipeline(process.stdin, writeStream);
    } catch {
        console.error('FS operation failed');
        process.exit(1);
    }
};

await write();