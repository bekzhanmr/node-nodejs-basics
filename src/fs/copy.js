import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files_copy');

    try {
        await fs.access(sourceDir);

        await fs.access(targetDir);
        throw new Error('FS operation failed');

    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(targetDir);

            const files = await fs.readdir(sourceDir);

            for (const file of files) {
                const sourceFile = path.join(sourceDir, file);
                const targetFile = path.join(targetDir, file);

                await fs.copyFile(sourceFile, targetFile);
            }
            console.log('Files copied successfully');

        } else {
            throw new Error('FS operation failed');
        }
    }
};

await copy();
