import { describe, test, expect } from 'vitest';
import countPossibleSecrets from './countPossibleSecrets';

describe('countPossibleSecrets', () => {
    test("Throw an error 'Incorrect Data' if no arguments passed", () => {
        // @ts-expect-error: intentionally execute without argumants
        expect(() => countPossibleSecrets()).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if only one argument passed", () => {
        // @ts-expect-error: intentionally execute with only one argument
        expect(() => countPossibleSecrets('2')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if length is not a number", () => {
        // @ts-expect-error: intentionally for testing
        expect(() => countPossibleSecrets('2', 'bin')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if base is not a string", () => {
        // @ts-expect-error: intentionally for testing
        expect(() => countPossibleSecrets(2, 123)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if length < 2", () => {
        expect(() => countPossibleSecrets(1, 'bin')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if length > 6", () => {
        expect(() => countPossibleSecrets(7, 'hex')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' for incorrect base", () => {
        // @ts-expect-error: intentionally for testing
        expect(() => countPossibleSecrets(3, 'ham')).toThrow('Incorrect Data');
    });

    test("Should return correct number of possible secrets for  'bin' base", () => {
        expect(countPossibleSecrets(4, 'bin')).toEqual(2);
    });

    test("Should return correct number of possible secrets for 'dec' base", () => {
        expect(countPossibleSecrets(3, 'dec')).toEqual(720);
    });
});
