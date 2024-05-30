import Boot from './scenes/Boot';
import GameTemplate from './scenes/GameTemplate';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import Preloader  from './scenes/Preloader';
import outlinedScene from './scenes/outlinedScene';
import gameLevels from './scenes/gameLevels';
import TitlePage from './scenes/TitlePage';
import _animationExperiment from './scenes/_animationExperiment';

const gameOptions = {
    TileSize: 100,   
    tileSpacing: 15, 
    boardSize: { rows: 5, cols: 5 },
    tweenSpeed: 50,
    aspectRatio: 16 / 9,
    padding: 100
};


let width = gameOptions.boardSize.cols * gameOptions.padding;
let height = width * gameOptions.aspectRatio;

const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        _animationExperiment,
        GameTemplate,
        TitlePage,
        MainMenu,
        Game,
        GameOver,
        outlinedScene,
        gameLevels
    ],
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);

export default game;
