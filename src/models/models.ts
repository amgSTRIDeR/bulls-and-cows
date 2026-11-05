export interface BullsAndCows {
    bulls: string[];
    cows: string[];
}

export const systems = {
    bin: '01',
    oct: '01234567',
    dec: '0123456789',
    hex: '0123456789abcdef',
} as const;

export type Base = 'bin' | 'oct' | 'dec' | 'hex';
