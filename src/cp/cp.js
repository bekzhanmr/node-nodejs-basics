import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'files', 'script.js');

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.stderr.pipe(process.stderr);

    child.on('error', (error) => {
        console.error(`Child process error: ${error.message}`);
    });

    return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['1', '2', '3']);
