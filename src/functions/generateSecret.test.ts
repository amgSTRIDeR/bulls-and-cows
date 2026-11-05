import { beforeAll, describe, expect, test } from 'vitest';
import generateSecret from './generateSecret';

describe('generateSecret', () => {
    let testRandom: () => number;
    beforeAll(() => {
        testRandom = () => 0.99;
    });

    test("Throw an error 'Incorrect Data' if length less than 2", () => {
        expect(() => generateSecret(1, 'oct', testRandom)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if length more than 6", () => {
        expect(() => generateSecret(7, 'oct', testRandom)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if base is a number", () => {
        expect(() => generateSecret(3, 2, testRandom)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if base is an object", () => {
        expect(() => generateSecret(3, {}, testRandom)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if base is not correct", () => {
        expect(() => generateSecret(3, 'des', testRandom)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if random is not a function", () => {
        expect(() => generateSecret(3, 'des', 'random')).toThrow('Incorrect Data');
    });

    test('Should return a string for correct data', () => {
        const result = generateSecret(3, 'dec');
        expect(typeof result).toBe('string');
    });

    test("Should return a string of length 2 for 'bin' base", () => {
        const result = generateSecret(6, 'bin');
        const resultLength = result.length;
        expect(resultLength).toBe(2);
    });

    test("Should return a string of length 2 for 'bin' base", () => {
        const result = generateSecret(6, 'bin');
        const resultLength = result.length;
        expect(resultLength).toBe(2);
    });

    test("Should return '10' for 'bin' base", () => {
        const result = generateSecret(4, 'bin', testRandom);
        expect(result).toBe('10');
    });

    test("Should return '7654' for 'oct' base", () => {
        const result = generateSecret(4, 'oct', testRandom);
        expect(result).toBe('7654');
    });

    test("Should return '98765' for 'dec' base", () => {
        const result = generateSecret(5, 'dec', testRandom);
        expect(result).toBe('98765');
    });

    test("Should return 'FEDCBA' for 'hex' base", () => {
        const result = generateSecret(6, 'hex', testRandom);
        expect(result).toBe('FEDCBA');
    });
});
