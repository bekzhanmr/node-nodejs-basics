import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';
import { Worker } from 'worker_threads';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    try {
        const numCores = os.cpus().length;

        const workerPath = path.join(__dirname, 'worker.js');

        const workerPromises = [];

        for (let i = 0; i < numCores; i++) {
            const data = 10 + i;

            const workerPromise = new Promise((resolve, reject) => {
                const worker = new Worker(workerPath, {
                    workerData: data
                });

                worker.on('message', (message) => {
                    worker.terminate();
                    resolve(message);
                });

                worker.on('error', (error) => {
                    worker.terminate();
                    reject(error);
                });
            });

            workerPromises.push(workerPromise);
        }

        const results = await Promise.all(workerPromises);

        console.log(results);
    } catch (error) {
        console.error('Worker thread error:', error);
        process.exit(1);
    }
};

await performCalculations();