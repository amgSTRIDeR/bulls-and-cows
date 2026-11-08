import createDigitValidator from '../functions/createDigitValidator';
import evaluateGuess from '../functions/evaluateGuess';
import generateSecret from '../functions/generateSecret';
import isValidGuess from '../functions/isValidGuess';
import type { BullsAndCows, Config } from '../models/models';
import { el, text } from '../ui/dom';
import { checkIcon, clockIcon, mascotIllustration, targetIcon } from '../ui/icons';

let timerIdx: ReturnType<typeof setInterval>;
let gameTime = '';
let tries = 0;

export function createGame(): HTMLElement {
    const art = el('div', { className: 'game__art', attributes: { 'aria-hidden': 'true' } }, mascotIllustration());
    const description = el(
        'p',
        { className: 'game__description' },
        text(
            'Угадайте число, которое загадал компьютер. Получайте быков (верные цифры на своём месте) и коров (верные цифры не на месте).'
        )
    );

    const gameField = el('div', { className: 'game-field' });

    return el(
        'section',
        { className: 'panel game', attributes: { 'aria-labelledby': 'game-title' } },
        art,
        el('h1', { className: 'game__title', text: 'Быки и коровы', attributes: { id: 'game-title' } }),
        description,
        gameField
    );
}

export function startGame(
    conf: Config,
    addTry: (guess: string, bullsAndCows: BullsAndCows) => void,
    addResult: (tries: number, gameTime: string, conf: Config) => void
) {
    if (!conf.base || !conf.length) {
        return;
    }

    const gameField = document.querySelector('.game-field');
    gameTime = '';
    tries = 0;
    const secret = generateSecret(conf.length, conf.base);

    if (gameField) {
        const currentGuess = Array.from({ length: conf.length }, () => '');
        clearInterval(timerIdx);
        gameField.textContent = '';
        const timeCounterEl = el('strong', { text: '00:00', className: 'time-counter' });
        const startTime = Date.now();
        timerIdx = setInterval(() => {
            const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
            const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
            const seconds = String(totalSeconds % 60).padStart(2, '0');
            gameTime = `${minutes}:${seconds}`;
            timeCounterEl.textContent = gameTime;
        }, 200);

        const triesEl = el('strong', { text: '0', className: 'tries-info' });

        const status = el(
            'div',
            { className: 'status', attributes: { 'aria-label': 'Current game status' } },
            el(
                'div',
                { className: 'status__item status__item--mode' },
                el('span', { className: 'status__symbol', text: '#' }),
                el('span', { text: `${conf.length} цифры`, className: 'length-info' }),
                el('span', { text: '·' }),
                el('span', { text: `${conf.base?.toUpperCase()}`, className: 'base-info' })
            ),
            el('div', { className: 'status__item' }, clockIcon(), timeCounterEl),
            el('div', { className: 'status__item' }, targetIcon(), el('span', {}, text('Попыток: '), triesEl))
        );

        const checkButton = el(
            'button',
            { className: 'button button--primary game__check', attributes: { type: 'button', disabled: 'true' } },
            checkIcon(),
            text('Проверить')
        );

        const inputs = el('div', {
            className: 'game__guess',
            attributes: { role: 'group', 'aria-label': 'Four assumed numbers' },
        });
        const digitValidator = createDigitValidator(conf.base);
        for (let i = 0; i < conf.length; i += 1) {
            const digitInput = el('input', {
                className: 'guess-digit',
                attributes: {
                    type: 'text',
                    inputmode: 'text',
                    maxlength: '1',
                    'aria-label': `guess-digit ${i}`,
                },
            });
            inputs.append(digitInput);

            digitInput.addEventListener('input', (e) => {
                if (e.target instanceof HTMLInputElement) {
                    if (digitValidator(e.target.value)) {
                        currentGuess[i] = e.target.value;
                        if (
                            conf.base &&
                            conf.length &&
                            currentGuess.join('').length === conf.length &&
                            isValidGuess(currentGuess.join(''), conf.length, conf.base)
                        ) {
                            checkButton.disabled = false;
                        } else {
                            checkButton.disabled = true;
                        }
                    } else {
                        currentGuess[i] = '';
                        checkButton.disabled = true;
                        digitInput.value = '';
                    }
                }
            });
        }

        checkButton.addEventListener('click', () => {
            tries += 1;
            triesEl.textContent = String(tries);
            roundEl.textContent = `Раунд ${tries + 1}`;
            const guessCheck = evaluateGuess(secret, currentGuess.join(''));
            addTry(currentGuess.join(''), guessCheck);
            if (guessCheck.bulls.length === conf.length) {
                addResult(tries, gameTime, conf);
                stopGame();
            }
        });

        const roundEl = el('p', { className: 'game__round', text: 'Раунд 1' });

        gameField.append(status, inputs, checkButton, roundEl);
    }
}

export function stopGame() {
    clearInterval(timerIdx);

    const gameField = document.querySelector('.game-field');

    const createStat = (label: string, value: string): HTMLElement =>
        el('div', { className: 'game__stat' }, el('span', { text: label }), el('strong', { text: value }));

    if (gameField) {
        gameField.textContent = '';
        gameField.append(
            el(
                'div',
                { className: 'game__result' },
                el('h3', { text: 'Ваш результат:' }),
                createStat('Попытки: ', String(tries)),
                createStat('Время: ', gameTime)
            )
        );
    }
    gameTime = '';
    tries = 0;
}
