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

export function addRecord(tries: number, gameTime: string) {
    const recordsFromStorage: GameRecord[] = JSON.parse(localStorage.getItem('game-records') ?? '[]');
    recordsFromStorage.push({ rank: 0, attempts: tries, time: gameTime });

    recordsFromStorage.sort((a, b) => {
        if (a.attempts < b.attempts) {
            return -1;
        } else if (a.attempts > b.attempts) {
            return 1;
        } else {
            const timeA = parseFloat(a.time.split(':').join(''));
            const timeB = parseFloat(b.time.split(':').join(''));
            if (timeA < timeB) {
                return -1;
            } else if (timeA > timeB) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    for (let i = 0; i < recordsFromStorage.length; i += 1) {
        const record = recordsFromStorage[i];
        if (record) {
            record.rank = i + 1;
        }
    }

    localStorage.setItem('game-records', JSON.stringify(recordsFromStorage));
    fillRecords();
}

function fillRecords() {
    requestAnimationFrame(() => {
        const recordTable = document.querySelector('.record-table');

        if (recordTable) {
            recordTable.textContent = '';
            const recordsFromStorage = JSON.parse(localStorage.getItem('game-records') ?? '[]');
            const records = recordsFromStorage ?? [];
            for (const record of records) {
                recordTable.append(
                    el(
                        'tr',
                        record.rank === 1 ? { className: 'records__best' } : {},
                        el('td', { text: String(record.rank) }),
                        el('td', { text: String(record.attempts) }),
                        el('td', { text: record.time })
                    )
                );
            }
        }
    });
}
