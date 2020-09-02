let game = document.querySelector("#game");
let gameWidth = 45;
let gameHight = 45;







//渲染这个地图
export function randerMap(levelData) {
    let mapData = levelData.maps ? levelData.maps : [];
    game.innerHTML = '';
    let rowLen = 0;
    //渲染地图：墙、空白、没有正确摆放的箱子
    mapData.forEach((row, rowIndex) => {
        row.forEach((val, colIndex) => {

            randerPiec(rowIndex, colIndex, val);

        });
        rowLen = row.length;
    })

    //放在里面，获取到mapData
    function isCorrect(row, col) {
        return levelData.correct.find(item => item.row == row && item.col == col);
    }

    //渲染每一个方块
    function randerPiec(row, col, val) {
        let div = document.createElement('div');
        div.className = 'item';
        let correct = isCorrect(row, col);
        if (val == 1) {
            div.classList.add('player')
        } else if (val == 2) {
            div.classList.add('wall')
        } else if (val == 3) {
            //当为盒子时，是否处在正确位置上
            if (correct) {
                div.classList.add('overBox')
            } else {
                div.classList.add('box')
            }

        } else {
            //当为空白时，是否处在正确位置上
            if (correct) {
                div.classList.add('overBoxPoint')
            }
        }
        div.style.left = col * gameWidth + 'px';
        div.style.top = row * gameHight + 'px';
        game.style.width = rowLen * gameWidth + 'px';
        game.style.height = mapData.length * gameHight + 'px';
        game.appendChild(div)
    }
}