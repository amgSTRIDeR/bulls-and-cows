import type { BullsAndCows } from '../models/models';

export default function evaluateGuess(secret: string, guess: string): BullsAndCows {
    if (
        !secret ||
        !guess ||
        typeof secret !== 'string' ||
        typeof guess !== 'string' ||
        secret.length !== guess.length ||
        secret.length < 2 ||
        secret.length > 6
    ) {
        throw new Error('Incorrect Data');
    }

    const lowerCaseSecret = secret.toLowerCase();
    const lowerCaseGuess = guess.toLowerCase();

    return lowerCaseGuess.split('').reduce(
        (summ: BullsAndCows, curr: string, index: number) => {
            if (curr === lowerCaseSecret[index]) {
                summ.bulls.push(curr.toUpperCase());
            } else if (lowerCaseSecret.includes(curr)) {
                summ.cows.push(curr.toUpperCase());
            }
            return summ;
        },
        {
            bulls: [],
            cows: [],
        }
    );
}
