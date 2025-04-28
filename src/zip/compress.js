import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    try {
        const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
        const destinationFilePath = path.join(__dirname, 'files', 'archive.gz');

        const readStream = fs.createReadStream(sourceFilePath);
        const gzip = zlib.createGzip();
        const writeStream = fs.createWriteStream(destinationFilePath);

        readStream.on('error', (error) => {
            console.error('FS operation failed');
            process.exit(1);
        });

        writeStream.on('error', (error) => {
            console.error('FS operation failed');
            process.exit(1);
        });

        await pipeline(
            readStream,
            gzip,
            writeStream
        );

        console.log('File compressed successfully');

    } catch {
        console.error('FS operation failed');
        process.exit(1);
    }
};

await compress();