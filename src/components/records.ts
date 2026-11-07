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
    const body = el('tbody');

    const recordsFromStorage = JSON.parse(localStorage.getItem('game-records') ?? '[]');
    const records = isDemoRecord(recordsFromStorage) ? recordsFromStorage : [];

    for (const record of records) {
        body.append(
            el(
                'tr',
                record.rank === 1 ? { className: 'records__best' } : {},
                el('td', { text: String(record.rank) }),
                el('td', { text: String(record.attempts) }),
                el('td', { text: record.time })
            )
        );
    }

    return el(
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
}

function isDemoRecord(value: unknown): value is GameRecord[] {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    return (
        'rank' in value &&
        typeof value.rank === 'number' &&
        'attempts' in value &&
        typeof value.attempts === 'number' &&
        'time' in value &&
        typeof value.time === 'string'
    );
}
