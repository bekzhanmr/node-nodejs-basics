import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const folderPath = path.join(__dirname, 'files');

    try {
        await fs.access(folderPath);

        const files = await fs.readdir(folderPath);

        for (const file of files) {
            console.log(file);
        }

    } catch {
        throw new Error('FS operation failed');
    }
};

await list();