import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const folderPath = path.join(__dirname, 'files_copy');

    const oldPath = path.join(folderPath, 'wrongFilename.txt');
    const newPath = path.join(folderPath, 'properFilename.md');

    try {
        await fs.access(oldPath);

        try {
            await fs.access(newPath);
            throw new Error('FS operation failed');

        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.rename(oldPath, newPath);
                console.log('File renamed successfully');

            } else {
                throw err;
            }
        }

    } catch {
        throw new Error('FS operation failed');
    }
};

await rename();