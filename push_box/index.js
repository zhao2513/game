import { randerMap } from './src/randerMap.js'
import { level } from "./src/level.js";
import { move, isCorrect } from './src/play.js'

const btn = document.querySelector("#btn");

let i = 0;
let levelData = level(i);


console.log(levelData)
randerMap(levelData);


//测试的时候可以把功能抛到window上
// window.move = move;
// window.randerMap = randerMap;

//判断游戏是否结束
let game_over = false;

window.onkeydown = (e) => {

    if (e.keyCode == '38') {
        game_over = move('up', levelData);
    } else if (e.keyCode == '40') {
        game_over = move('down', levelData);
    } else if (e.keyCode == '37') {
        game_over = move('left', levelData);
    } else if (e.keyCode == '39') {
        game_over = move('right', levelData);
    }

    if (game_over) {
        randerMap(levelData);
    }

    if (isCorrect()) {

        alert('游戏结束');
        i = i > 2 ? 0 : i + 1;
        levelData = level(i);
        randerMap(levelData);
    }
}

btn.onclick = function() {
    levelData = level(i);
    console.log(levelData)
    randerMap(levelData);
    console.log('1')
}