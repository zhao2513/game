//做一个控制游戏关卡的开关
import * as mapData from "./mapData.js";

// let levelData = {}
export function level(i = 0) {
    //深度克隆数组=>配合重新开始功能。
    let maps = [];
    mapData['maps'][i].forEach(ele => {
        let arr = [];
        ele.forEach(eles => arr.push(eles));
        console.log(ele)
        maps.push(arr);
    })
    console.log(maps)
        //把每一关的地图和对应位置展开
    return {...mapData, 'maps': maps, 'correct': mapData['correct'][i] }
}

// export default levelData;