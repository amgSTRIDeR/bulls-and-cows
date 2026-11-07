import { el, text } from '../ui/dom';
import { checkIcon, clockIcon, mascotIllustration, targetIcon } from '../ui/icons';

const digits = [
    { label: 'First number', value: '' },
    { label: 'Second number', value: '' },
    { label: 'Third number', value: '' },
    { label: 'Fourth number', value: '' },
] as const;

function createDigitInput(label: string, value: string): HTMLInputElement {
    const input = el('input', {
        className: 'guess-digit',
        attributes: {
            type: 'text',
            inputmode: 'text',
            maxlength: '1',
            'aria-label': label,
        },
    });
    input.value = value;
    return input;
}

export function createGame(): HTMLElement {
    const art = el('div', { className: 'game__art', attributes: { 'aria-hidden': 'true' } }, mascotIllustration());
    const description = el(
        'p',
        { className: 'game__description' },
        text(
            'Угадайте число, которое загадал компьютер. Получайте быков (верные цифры на своём месте) и коров (верные цифры не на месте).'
        )
    );

    const status = el(
        'div',
        { className: 'status', attributes: { 'aria-label': 'Current game status' } },
        el(
            'div',
            { className: 'status__item status__item--mode' },
            el('span', { className: 'status__symbol', text: '#' }),
            el('span', { text: 'количество цифр', className: 'length-info' }),
            el('span', { text: '·' }),
            el('span', { text: 'база', className: 'base-info' })
        ),
        el('div', { className: 'status__item' }, clockIcon(), el('strong', { className: 'time-counter' })),
        el(
            'div',
            { className: 'status__item' },
            targetIcon(),
            el('span', {}, text('Попыток: '), el('strong', { text: '0', className: 'tries-info' }))
        )
    );

    const inputs = el(
        'div',
        { className: 'game__guess', attributes: { role: 'group', 'aria-label': 'Four assumed numbers' } },
        ...digits.map(({ label, value }) => createDigitInput(label, value))
    );

    return el(
        'section',
        { className: 'panel game', attributes: { 'aria-labelledby': 'game-title' } },
        art,
        el('h1', { className: 'game__title', text: 'Быки и коровы', attributes: { id: 'game-title' } }),
        description,
        status,
        inputs,
        el(
            'button',
            { className: 'button button--primary game__check', attributes: { type: 'button' } },
            checkIcon(),
            text('Проверить')
        ),
        el('p', { className: 'game__round', text: 'Раунд 1' })
    );
}
