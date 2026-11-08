import './styles.scss';
import { el } from './ui/dom';
import { createSettings } from './components/settings';
import { createGame, startGame } from './components/game';
import { addHistoryEntry, createHistory, resetHistory } from './components/history';
import { addRecord, createRecords } from './components/records';
import type { BullsAndCows, Config } from './models/models';

function renderPage(): void {
    const rightColumn = el('div', { className: 'right-column' }, createHistory(), createRecords());
    const dashboard = el('main', { className: 'dashboard' }, createSettings(renderGame), createGame(), rightColumn);
    document.body.append(dashboard);
}

renderPage();

function renderGame(conf: Config) {
    startGame(conf, addTry, addResult);
    resetHistory();
}

function addTry(guess: string, bullsAndCows: BullsAndCows) {
    addHistoryEntry(guess, bullsAndCows);
}

function addResult(tries: number, gameTime: string) {
    addRecord(tries, gameTime);
}
