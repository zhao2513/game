//运动原理：交换地图上玩家的位置，重新渲染

//保存数据
let levelData = '';
let data = [];

//获取玩家的位置
function playerPosit() {

    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            if (data[row][col] == levelData.PLAYER) {
                return {
                    row,
                    col
                }
                break;
            }
        }
    }
}

//获取下一个目标点
// row，col为当前目标点
// direction:下一个目标点的方向
function targetNext(row, col, direction) {
    let result = {};
    if (direction == 'up') {
        result = {
            row: row - 1,
            col
        }
    } else if (direction == 'down') {
        result = {
            row: row + 1,
            col
        }
    } else if (direction == 'left') {
        result = {
            row,
            col: col - 1
        }
    } else if (direction == 'right') {
        result = {
            row,
            col: col + 1
        }
    }

    //获取下一个目标点的值
    for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < data[j].length; i++) {

            if (result.row == j && result.col == i) {
                result = {...result, value: data[j][i] }
            }
        }
    }

    return result;

}




//移动后交换两个对象的位置
let changePos = (obj1, obj2) => {
    let row = obj1["row"];
    let col = obj1["col"];
    let row1 = obj2['row'];
    let col1 = obj2['col'];

    //data是地图数据，需要从Move方法中获取
    let a = data[row][col];
    data[row][col] = data[row1][col1];
    data[row1][col1] = a;


}

export function move(direction, levelDatas) {
    levelData = levelDatas;
    data = levelDatas.maps;
    let playerPos = playerPosit();
    let nextPos = targetNext(playerPos.row, playerPos.col, direction);
    //如果是墙，直接返回
    if (nextPos.value == levelData.WALL) {

        return false;
    } else if (nextPos.value == levelData.BOX) { //玩家下一个是箱子
        let nextNextPost = targetNext(nextPos.row, nextPos.col, direction);
        if (nextNextPost.value != levelData.SPACE) { //箱子下一个是否为空
            return false;
        } else {

            changePos(nextPos, nextNextPost);
            changePos(playerPos, nextPos);
            return true;
        }
    } else { //下一个是空白
        changePos(playerPos, nextPos);
        return true;
    }
    return false;
}

export function isCorrect() {
    let result = false;
    result = levelData.correct.every(obj => {
        let row = obj['row'];
        let col = obj['col'];
        return data[row][col] == levelData.BOX


    })
    return result;
}