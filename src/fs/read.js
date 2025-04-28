import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const readPath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        await fs.access(readPath);

        const content = await fs.readFile(readPath, 'utf8');
        console.log(content);

    } catch {
        throw new Error('FS operation failed');
    }
};

await read();