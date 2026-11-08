import countPossibleSecrets from '../functions/countPossibleSecrets';
import type { Base, Config, RenderGameFunction } from '../models/models';
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

export function createSettings(renderGame: RenderGameFunction): HTMLElement {
    let config: Config = {
        base: null,
        length: null,
    };

    const brand = el(
        'div',
        { className: 'settings__brand' },
        bullIcon(),
        el('h2', { attributes: { id: 'settings-title' } }, text('Быки и коровы'))
    );

    const combinationsValueEl = el('strong', { className: 'combinations--value' });

    const combinations = el(
        'div',
        { className: 'combinations', attributes: { 'aria-label': 'Number of combinations' } },
        layersIcon(),
        el('p', {}, text('Количество комбинаций: '), combinationsValueEl)
    );

    const newGame = el(
        'button',
        { className: 'button button--primary settings__new-game', attributes: { type: 'button', disabled: 'true' } },
        refreshIcon(),
        text('Новая игра')
    );

    newGame.addEventListener('click', () => {
        renderGame(config);
    });

    const lengthGroup = group('Длина числа', '', 'length', ['2', '3', '4', '5', '6']);
    const baseGroup = group('Система счисления', 'settings__group--base', 'base', ['BIN', 'OCT', 'DEC', 'HEX']);

    baseGroup.addEventListener('change', (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value.toLowerCase();
            if (isBase(value)) {
                const nextLength = value === 'bin' && config.length !== null ? 2 : config.length;

                config = {
                    ...config,
                    base: value,
                    length: nextLength,
                };

                if (value === 'bin') {
                    narrowLength(lengthGroup, nextLength !== null);
                } else {
                    widerLength(lengthGroup);
                }
            }
            checkConfig(config, combinationsValueEl, newGame);
        }
    });

    lengthGroup.addEventListener('change', (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = +e.target.value;
            if (Number.isInteger(value)) {
                config = {
                    ...config,
                    length: value,
                };
            }
        }

        checkConfig(config, combinationsValueEl, newGame);
    });

    return el(
        'aside',
        { className: 'panel settings', attributes: { 'aria-labelledby': 'settings-title' } },
        brand,
        el('div', { className: 'settings__divider', attributes: { 'aria-hidden': 'true' } }),
        baseGroup,
        lengthGroup,
        combinations,
        newGame
    );
}

function isBase(value: string): value is Base {
    return ['bin', 'oct', 'dec', 'hex'].includes(value);
}

function narrowLength(group: HTMLFieldSetElement, setActive?: boolean) {
    const lengthInputs = group.querySelectorAll('input');
    lengthInputs.forEach((input) => {
        if (input.value === '2') {
            if (setActive) {
                input.checked = true;
            } else {
                input.checked = false;
            }
        } else {
            input.checked = false;
            input.disabled = true;
        }
    });
}

function widerLength(group: HTMLFieldSetElement) {
    const lengthInputs = group.querySelectorAll('input');
    lengthInputs.forEach((input) => {
        input.disabled = false;
    });
}

function checkConfig(conf: Config, combinationsValueEl: HTMLElement, newGameButton: HTMLButtonElement) {
    const length = conf.length;
    const base = conf.base;
    if (length && base) {
        newGameButton.disabled = false;
        combinationsValueEl.textContent = String(countPossibleSecrets(length, base));
    } else {
        newGameButton.disabled = true;
        combinationsValueEl.textContent = '';
    }
}
