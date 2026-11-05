import { describe, expect, test } from 'vitest';
import evaluateGuess from './evaluateGuess';

describe('evaluateGuess', () => {
    test("Throw an error 'Incorrect Data' if secret is not a string", () => {
        expect(() => evaluateGuess(1, '123')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if guess is not a string", () => {
        expect(() => evaluateGuess('123', {})).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if secret and guess has different length", () => {
        expect(() => evaluateGuess('123', '1')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if secret are null", () => {
        expect(() => evaluateGuess(null, '123')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if guess are null", () => {
        expect(() => evaluateGuess('ABC', null)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if secret and guess lengths < 2", () => {
        expect(() => evaluateGuess('A', 'A')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if secret and guess lengths > 6", () => {
        expect(() => evaluateGuess('1234567', '1234567')).toThrow('Incorrect Data');
    });

    test('Should return correct result if secret equal guess', () => {
        const result = {
            bulls: ['1', '2', '3'],
            cows: [],
        };
        expect(evaluateGuess('123', '123')).toEqual(result);
    });

    test('Should return correct result if some numbers are correct', () => {
        const result = {
            bulls: ['1', '7', '5'],
            cows: ['2', 'F'],
        };
        expect(evaluateGuess('1F752', '1275F')).toEqual(result);
    });

    test('Should return correct cows if numbers are correct but not an order', () => {
        const result = {
            bulls: [],
            cows: ['C', '3', '5', '2', 'F'],
        };
        expect(evaluateGuess('F523C', 'C352F')).toEqual(result);
    });

    test('Should return empty bulls and cows if nothing guessed correct', () => {
        const result = {
            bulls: [],
            cows: [],
        };
        expect(evaluateGuess('1F752', 'BC346')).toEqual(result);
    });
});
