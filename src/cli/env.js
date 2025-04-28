import process from 'process';

const parseEnv = () => {
    const allEnvVars = process.env;

    const rssVars = Object.entries(allEnvVars)
        .filter(([key]) => key.startsWith('RSS_'));

    const formattedOutput = rssVars
        .map(([key, value]) => `${key}=${value}`).join('; ');

    console.log(formattedOutput);
};

parseEnv();