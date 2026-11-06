import { systems, type Base } from '../models/models';

interface CountPossibleSecrets {
    (length: number, base: Base): number;
    cache: Record<string, number>;
}

const countPossibleSecrets: CountPossibleSecrets = (length: number, base: Base) => {
    if (
        !length ||
        !base ||
        typeof length !== 'number' ||
        typeof base !== 'string' ||
        length < 2 ||
        length > 6 ||
        !systems[base]
    ) {
        throw new Error('Incorrect Data');
    }

    let currentLength = length;

    if (base === 'bin') {
        currentLength = 2;
    }

    const cacheKey = `${currentLength}:${base}`;

    if (countPossibleSecrets.cache[cacheKey] !== undefined) {
        return countPossibleSecrets.cache[cacheKey];
    }

    const baseLength = systems[base].length;

    if (currentLength === 2) {
        return systems[base].length * (baseLength + 1 - currentLength);
    }

    return countPossibleSecrets(currentLength - 1, base) * (baseLength + 1 - currentLength);
};

countPossibleSecrets.cache = {};

export default countPossibleSecrets;
