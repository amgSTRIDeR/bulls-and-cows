import type { GameRecord } from '../models/models';
import { el } from '../ui/dom';
import { trophyIcon } from '../ui/icons';

export function createRecords(): HTMLElement {
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

export function addRecord(tries: number, gameTime: string): void {
    const records: GameRecord[] = JSON.parse(localStorage.getItem('game-records') ?? '[]');

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

    localStorage.setItem('game-records', JSON.stringify(updatedRecords));

    fillRecords(tries, gameTime);
}

function fillRecords(tries?: number, gameTime?: string) {
    requestAnimationFrame(() => {
        const recordTable = document.querySelector('.record-table');

        if (recordTable) {
            recordTable.textContent = '';
            const recordsFromStorage = JSON.parse(localStorage.getItem('game-records') ?? '[]');
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
