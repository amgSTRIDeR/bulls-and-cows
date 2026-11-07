import { el, text } from '../ui/dom';
import { bullIcon, layersIcon, refreshIcon } from '../ui/icons';

function choice(name: string, value: string, label: string): HTMLLabelElement {
    const input = el('input', { attributes: { type: 'radio', name, value } });

    return el('label', { className: 'choice' }, input, el('span', { text: label }));
}

function group(title: string, className: string, name: string, options: readonly string[]): HTMLFieldSetElement {
    const choices = el('div', { className: `settings__choices settings__choices--${name}` });
    for (const value of options) {
        choices.append(choice(name, value.toLowerCase(), value));
    }

    return el('fieldset', { className: `settings__group ${className}`.trim() }, el('legend', { text: title }), choices);
}

export function createSettings(): HTMLElement {
    const brand = el(
        'div',
        { className: 'settings__brand' },
        bullIcon(),
        el('h2', { attributes: { id: 'settings-title' } }, text('Быки и коровы'))
    );

    const combinations = el(
        'div',
        { className: 'combinations', attributes: { 'aria-label': 'Number of combinations' } },
        layersIcon(),
        el('p', {}, text('Количество комбинаций:'), el('strong', { className: 'combinations' }))
    );

    const newGame = el(
        'button',
        { className: 'button button--primary settings__new-game', attributes: { type: 'button' } },
        refreshIcon(),
        text('Новая игра')
    );

    return el(
        'aside',
        { className: 'panel settings', attributes: { 'aria-labelledby': 'settings-title' } },
        brand,
        el('div', { className: 'settings__divider', attributes: { 'aria-hidden': 'true' } }),
        group('Длина числа', '', 'length', ['2', '3', '4', '5', '6']),
        group('Система счисления', 'settings__group--base', 'base', ['BIN', 'OCT', 'DEC', 'HEX']),
        combinations,
        newGame
    );
}
