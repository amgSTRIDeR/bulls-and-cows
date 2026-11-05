interface BullsAndCows {
    bulls: string[];
    cows: string[];
}

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

    const result = {
        bulls: [],
        cows: [],
    };

    return guess.split('').reduce(
        (summ: BullsAndCows, curr: string, index: number) => {
            if (curr === secret[index]) {
                summ.bulls.push(curr);
            } else if (secret.includes(curr)) {
                summ.cows.push(curr);
            }
            return summ;
        },
        {
            bulls: [],
            cows: [],
        }
    );
}
