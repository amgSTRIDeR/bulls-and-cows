import { type Base } from '../models/models';
import createDigitValidator from './createDigitValidator';

export default function isValidGuess(guess: string, length: number, base: Base): boolean {
    if (
        !guess ||
        !length ||
        !base ||
        typeof guess !== 'string' ||
        guess.length < 2 ||
        guess.length > 6 ||
        typeof length !== 'number' ||
        typeof base !== 'string'
    ) {
        throw new Error('Incorrect Data');
    }

    const validateDigit = createDigitValidator(base);

    if (guess.length !== length) {
        return false;
    }

    const uniqueArray = new Set(guess.split(''));
    if (uniqueArray.size !== guess.length) {
        return false;
    }

    for (let i = 0; i < guess.length; i += 1) {
        if (!validateDigit(guess.charAt(i))) {
            return false;
        }
    }

    return true;
}
