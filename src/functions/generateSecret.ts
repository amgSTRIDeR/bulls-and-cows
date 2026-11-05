export default function generateSecret(length: number, base: string, random = Math.random) {
    const systems = {
        bin: ['0', '1'],
        oct: ['0', '1', '2', '3', '4', '5', '6', '7'],
        dec: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    };

    if (length < 2 || length > 6) {
        throw new Error('Incorrect Data');
    }

    if (typeof base !== 'string') {
        throw new Error('Incorrect Data');
    }

    if (random && typeof random !== 'function') {
        throw new Error('Incorrect Data');
    }

    let secret = '';

    switch (base) {
        case 'bin':
            for (let i = 0; i < 2; i += 1) {
                const index = Math.floor(random() * systems.bin.length);
                secret += systems.bin.splice(index, 1);
            }
            break;
        case 'oct':
            for (let i = 0; i < length; i += 1) {
                const index = Math.floor(random() * systems.oct.length);
                secret += systems.oct.splice(index, 1);
            }
            break;
        case 'dec':
            for (let i = 0; i < length; i += 1) {
                const index = Math.floor(random() * systems.dec.length);
                secret += systems.dec.splice(index, 1);
            }
            break;
        case 'hex':
            for (let i = 0; i < length; i += 1) {
                const index = Math.floor(random() * systems.hex.length);
                secret += systems.hex.splice(index, 1);
            }
            break;
        default:
            throw new Error('Incorrect Data');
    }

    return secret;
}
