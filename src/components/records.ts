import type { Config, GameRecord } from '../models/models';
import { el } from '../ui/dom';
import { trophyIcon } from '../ui/icons';
import { isBase } from './settings';

let currentConf: Config = {
    base: null,
    length: null,
};

function choice(name: string, value: string, label: string): HTMLLabelElement {
    const input = el('input', { attributes: { type: 'radio', name, value } });

    return el('label', { className: 'record-choice' }, input, el('span', { text: label }));
}

function group(title: string, className: string, name: string, options: readonly string[]): HTMLFieldSetElement {
    const choices = el('div', { className: `record__choices record__choices--${name}` });
    for (const value of options) {
        choices.append(choice(name, value.toLowerCase(), value));
    }

    return el('fieldset', { className: `record__group ${className}`.trim() }, el('legend', { text: title }), choices);
}

export function createRecords(): HTMLElement {
    currentConf.length = null;
    currentConf.base = null;
    const baseGroup = group('', 'record__group--base', 'record-base', ['BIN', 'OCT', 'DEC', 'HEX']);
    const lengthGroup = group('', '', 'record-length', ['2', '3', '4', '5', '6']);

    baseGroup.addEventListener('change', (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value.toLowerCase();
            if (isBase(value)) {
                currentConf = {
                    ...currentConf,
                    base: value,
                };
            }
            fillRecords();
        }
    });

    lengthGroup.addEventListener('change', (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = +e.target.value;
            if (Number.isInteger(value)) {
                currentConf = {
                    ...currentConf,
                    length: value,
                };
            }
            fillRecords();
        }
    });

    const header = el(
        'thead',
        {},
        el(
            'tr',
            {},
            el('th', { text: '№', attributes: { scope: 'col' } }),
            el('th', { text: 'Попытки', attributes: { scope: 'col' } }),
            el('th', { text: 'Время', attributes: { scope: 'col' } })
        )
    );
    const body = el('tbody', { className: 'record-table' });

    const recordsEl = el(
        'section',
        { className: 'panel records', attributes: { 'aria-labelledby': 'records-title' } },
        el(
            'h2',
            { className: 'section-heading', attributes: { id: 'records-title' } },
            trophyIcon(),
            el('span', { text: 'Лучшие результаты' })
        ),
        baseGroup,
        lengthGroup,
        el(
            'table',
            { className: 'records__table' },
            el('caption', { className: 'visually-hidden', text: 'Лучшие результаты игроков' }),
            header,
            body
        )
    );

    fillRecords();
    return recordsEl;
}

function timeToSeconds(time: string): number {
    return time
        .split(':')
        .map(Number)
        .reduce((total, value) => total * 60 + value, 0);
}

export function addRecord(tries: number, gameTime: string, conf: Config): void {
    const records: GameRecord[] = JSON.parse(localStorage.getItem(`game-records-${conf.base}-${conf.length}`) ?? '[]');

    const newRecord: GameRecord = {
        rank: 0,
        attempts: tries,
        time: gameTime,
    };

    const updatedRecords = [...records, newRecord]
        .sort((a, b) => a.attempts - b.attempts || timeToSeconds(a.time) - timeToSeconds(b.time))
        .map((record, index) => ({
            ...record,
            rank: index + 1,
        }));

    localStorage.setItem(`game-records-${conf.base}-${conf.length}`, JSON.stringify(updatedRecords));
    if (currentConf.base === conf.base && currentConf.length === conf.length) {
        fillRecords(tries, gameTime);
    }
}

function fillRecords(tries?: number, gameTime?: string) {
    if (!currentConf.base && !currentConf.length) {
        return;
    }
    requestAnimationFrame(() => {
        const recordTable = document.querySelector('.record-table');

        if (recordTable) {
            recordTable.textContent = '';
            const recordsFromStorage = JSON.parse(
                localStorage.getItem(`game-records-${currentConf.base}-${currentConf.length}`) ?? '[]'
            );
            const records = recordsFromStorage ?? [];
            for (const record of records) {
                let recordClass = {};
                if (tries === record.attempts && gameTime === record.time) {
                    recordClass = { className: 'records__best' };
                    tries = undefined;
                    gameTime = undefined;
                }
                recordTable.append(
                    el(
                        'tr',
                        recordClass,
                        el('td', { text: String(record.rank) }),
                        el('td', { text: String(record.attempts) }),
                        el('td', { text: record.time })
                    )
                );
            }
        }
    });
}
