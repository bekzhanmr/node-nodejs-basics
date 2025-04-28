import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const removePath = path.join(__dirname, 'files_copy', 'fileToRemove.txt');

    try {
        await fs.access(removePath);

        await fs.unlink(removePath);
        console.log('File deleted successfully');

    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();