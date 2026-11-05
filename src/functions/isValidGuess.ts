import { systems, type Base } from '../models/models';

export default function isValidGuess(guess: string, length: number, base: Base): boolean {
    if (
        !guess ||
        !length ||
        !base ||
        typeof guess !== 'string' ||
        guess.length < 2 ||
        guess.length > 6 ||
        typeof length !== 'number' ||
        typeof base !== 'string' ||
        !systems[base]
    ) {
        throw new Error('Incorrect Data');
    }

    if (guess.length !== length) {
        return false;
    }

    const uniqueArray = new Set(guess.split(''));
    if (uniqueArray.size !== guess.length) {
        return false;
    }

    for (let i = 0; i < guess.length; i += 1) {
        if (!systems[base].includes(guess.charAt(i).toLowerCase())) {
            return false;
        }
    }

    return true;
}
