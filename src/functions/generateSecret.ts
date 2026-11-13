import { systems, type Base } from '../models/models';

export default function generateSecret(length: number, base: Base, random = Math.random): string {
    const digits = systems[base];

    if (
        length < 2 ||
        length > 6 ||
        !Number.isInteger(length) ||
        typeof base !== 'string' ||
        !digits ||
        (random && typeof random !== 'function')
    ) {
        throw new Error('Incorrect Data');
    }
    let secret = '';

    const digitsArr = [...digits];

    for (let i = 0; i < (base === 'bin' ? 2 : length); i += 1) {
        const index = random() * digitsArr.length;
        secret += digitsArr.splice(index, 1);
    }

    return secret.toUpperCase();
}
