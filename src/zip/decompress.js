import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    try {
        const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');
        const destinationFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

        const readStream = fs.createReadStream(sourceFilePath);
        const gunzip = zlib.createGunzip();
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
            gunzip,
            writeStream
        );

        console.log('File decompressed successfully');
    } catch {
        console.error('FS operation failed');
        process.exit(1);
    }
};

await decompress();