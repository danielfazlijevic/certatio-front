const lobbyMusic = require('../sound/lobby.mp3');

const gameMusic = require('../sound/game.mp3');

let bgSound;

export const playLobbyMusic = () => {
    bgSound = new Audio(lobbyMusic);
    bgSound.loop = true;
    bgSound.volume = '0.08';
    bgSound.play();
};

export const switchToGameMusic = () => {
    bgSound.src = gameMusic;
    bgSound.load();
    bgSound.loop = true;
    bgSound.volume = '0.08';
    bgSound.play();
};