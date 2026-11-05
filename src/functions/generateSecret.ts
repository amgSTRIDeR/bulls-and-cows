const systems = {
    bin: '01',
    oct: '01234567',
    dec: '0123456789',
    hex: '0123456789ABCDEF',
} as const;

type Base = 'bin' | 'oct' | 'dec' | 'hex';

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

    return secret;
}
