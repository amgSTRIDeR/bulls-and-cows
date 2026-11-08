import type { BullsAndCows } from '../models/models';
import { el } from '../ui/dom';
import { historyIcon } from '../ui/icons';

type DigitStatus = 'bull' | 'cow' | 'miss';

function legendItem(status: 'bull' | 'cow', label: string): HTMLElement {
    return el(
        'span',
        { className: 'legend__item' },
        el('i', { className: `legend__swatch legend__swatch--${status}`, attributes: { 'aria-hidden': 'true' } }),
        el('span', { text: label })
    );
}

function createAttempt(guess: string, bullsAndCows: BullsAndCows): HTMLLIElement {
    const row = el('li', {
        className: 'history__row',
    });
    const labelByStatus: Record<DigitStatus, string> = {
        bull: 'бык',
        cow: 'корова',
        miss: 'не угадана',
    };

    guess.split('').forEach((digit) => {
        const status = bullsAndCows.bulls.includes(digit) ? 'bull' : bullsAndCows.cows.includes(digit) ? 'cow' : 'miss';
        const className = status === 'miss' ? 'history__digit' : `history__digit history__digit--${status}`;
        row.append(
            el('span', {
                className,
                text: digit,
                attributes: { 'aria-label': `${digit} — ${labelByStatus[status]}` },
            })
        );
    });

    return row;
}

export function createHistory(): HTMLElement {
    const list = el('ol', { className: 'history__list', attributes: { 'aria-label': 'Предыдущие попытки' } });
    return el(
        'section',
        { className: 'panel history', attributes: { 'aria-labelledby': 'history-title' } },
        el(
            'h2',
            { className: 'section-heading', attributes: { id: 'history-title' } },
            historyIcon(),
            el('span', { text: 'История попыток' })
        ),
        el(
            'div',
            { className: 'legend', attributes: { 'aria-label': 'Значение цветов цифр' } },
            legendItem('bull', 'Бык на своём месте'),
            legendItem('cow', 'Корова не на месте')
        ),
        list
    );
}

export function addHistoryEntry(guess: string, bullsAndCows: BullsAndCows) {
    const list = document.querySelector('.history__list');
    if (list) {
        list.prepend(createAttempt(guess, bullsAndCows));
    }
}

export function resetHistory() {
    const list = document.querySelector('.history__list');
    if (list) {
        list.textContent = '';
    }
}
