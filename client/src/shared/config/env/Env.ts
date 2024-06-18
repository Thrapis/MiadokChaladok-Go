
const getEnvVar = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return process.env[key] || '';
};

export const API_SOURCE = getEnvVar('REACT_APP_API_SOURCE');
export const IMAGES_SOURCE = getEnvVar('REACT_APP_IMAGES_SOURCE');