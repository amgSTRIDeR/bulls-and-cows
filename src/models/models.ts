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

export interface GameRecord {
    rank: number;
    attempts: number;
    time: string;
}

export interface Config {
    base: Base | null;
    length: number | null;
}

export type RenderGameFunction = (conf: Config) => void;
