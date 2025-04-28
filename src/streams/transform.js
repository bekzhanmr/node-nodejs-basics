import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import process from 'process';
const transform = async () => {
    try {
        const reverseTransform = new Transform({
            transform(chunk, encoding, callback) {
                const inputString = chunk.toString();

                const reversedString = inputString.split('').reverse().join('');

                callback(null, reversedString);
            }
        });

        await pipeline(
            process.stdin,
            reverseTransform,
            process.stdout
        );
    } catch {
        console.error('Stream operation failed');
        process.exit(1);
    }
};

await transform();