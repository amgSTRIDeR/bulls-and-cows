import { describe, expect, test } from 'vitest';
import isValidGuess from './isValidGuess';

describe('isValidGuess', () => {
    test("Throw an error 'Incorrect Data' if guess is not a string", () => {
        // @ts-expect-error: intentionally for testing
        expect(() => isValidGuess(1, 1, 'bin')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if length is not a number", () => {
        // @ts-expect-error: intentionally for testing
        expect(() => isValidGuess('12', '1', 'bin')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if base is not correct", () => {
        // @ts-expect-error: intentionally for testing
        expect(() => isValidGuess('12', 1, 'tho')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if guess length < 2", () => {
        expect(() => isValidGuess('1', 1, 'dec')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if guess length > 6", () => {
        expect(() => isValidGuess('1234567', 1, 'dec')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if 2 arguments", () => {
        // @ts-expect-error: intentionally execute with two arguments
        expect(() => isValidGuess('1234567', 1)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if 1 argument", () => {
        // @ts-expect-error: intentionally execute with only one argument
        expect(() => isValidGuess('1234567')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if no arguments", () => {
        // @ts-expect-error: intentionally execute without arguments
        expect(() => isValidGuess()).toThrow('Incorrect Data');
    });

    test('Should return false if guess length is incorrect', () => {
        expect(isValidGuess('123', 4, 'hex')).toBeFalsy();
    });

    test("Should return false if numbers are incorrect for the 'bin' base", () => {
        expect(isValidGuess('12', 2, 'bin')).toBeFalsy();
    });

    test("Should return false if numbers are incorrect for the 'dec' base", () => {
        expect(isValidGuess('12F-', 4, 'dec')).toBeFalsy();
    });

    test("Should return false if numbers are incorrect for the 'oct' base", () => {
        expect(isValidGuess('1294', 4, 'oct')).toBeFalsy();
    });

    test("Should return false if numbers are incorrect for the 'hex' base", () => {
        expect(isValidGuess('12ZA', 4, 'hex')).toBeFalsy();
    });

    test('Should return false if numbers are repeated', () => {
        expect(isValidGuess('353', 3, 'oct')).toBeFalsy();
    });

    test("Should return true if everything is correct for 'bin' base", () => {
        expect(isValidGuess('10', 2, 'bin')).toBeTruthy();
    });

    test("Should return true if everything is correct for 'oct' base", () => {
        expect(isValidGuess('146', 3, 'oct')).toBeTruthy();
    });

    test("Should return true if everything is correct for 'dec' base", () => {
        expect(isValidGuess('5730', 4, 'dec')).toBeTruthy();
    });

    test("Should return true if everything is correct for 'hex' base", () => {
        expect(isValidGuess('5A730F', 6, 'hex')).toBeTruthy();
    });
});
