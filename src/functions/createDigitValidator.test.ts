import { describe, test, expect } from 'vitest';
import createDigitValidator from './createDigitValidator';

describe('createDigitValidator', () => {
    test("Throw an error 'Incorrect Data' if base is not a string", () => {
        expect(() => createDigitValidator(123)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if base is not from a systems", () => {
        expect(() => createDigitValidator('bis')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if char length > 1", () => {
        expect(() => createDigitValidator('bis')).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if no char", () => {
        const func = createDigitValidator('dec');
        expect(() => func()).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if char is not a string", () => {
        const func = createDigitValidator('bin');
        expect(() => func(1)).toThrow('Incorrect Data');
    });

    test("Throw an error 'Incorrect Data' if char length > 1", () => {
        const func = createDigitValidator('bin');
        expect(() => func(' 1')).toThrow('Incorrect Data');
    });

    test('Should return false if char is not right for the dec system', () => {
        const func = createDigitValidator('dec');
        expect(func('t')).toBeFalsy();
    });

    test('Should return false if char is not right for the bin system', () => {
        const func = createDigitValidator('bin');
        expect(func('2')).toBeFalsy();
    });

    test('Should return false if char is not right for the hex system', () => {
        const func = createDigitValidator('hex');
        expect(func('H')).toBeFalsy();
    });

    test('Should return true if char is right for the hex system for lowerCase', () => {
        const func = createDigitValidator('hex');
        expect(() => func('b')).toBeTruthy();
    });

    test('Should return true if char is right for the hex system for upperCase', () => {
        const func = createDigitValidator('hex');
        expect(() => func('B')).toBeTruthy();
    });

    test('Should return true if char is right for the bin system', () => {
        const func = createDigitValidator('bin');
        expect(() => func('0')).toBeTruthy();
    });

    test('Should return true if char is right for the dec system', () => {
        const func = createDigitValidator('dec');
        expect(() => func('9')).toBeTruthy();
    });

    test('Should return true if char is right for the oct system', () => {
        const func = createDigitValidator('oct');
        expect(() => func('0')).toBeTruthy();
    });
});
