import { systems, type Base } from '../models/models';

export default function createDigitValidator(base: Base) {
    if (!base || typeof base !== 'string' || !systems[base]) {
        throw new Error('Incorrect Data');
    }

    return (char: string) => {
        if (!char || typeof char !== 'string' || char.length !== 1) {
            throw new Error('Incorrect Data');
        }
        if (systems[base].includes(char.toLowerCase())) return true;
        return false;
    };
}
