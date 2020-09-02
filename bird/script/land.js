//天空类 ： 移动 ，超出left要手动调整

const landDom = document.querySelector('.land');
const landStyle = getComputedStyle(landDom);
const landW = parseFloat(landStyle.width);
const landH = parseFloat(landStyle.height);


class Land extends Demo {
    constructor(width,height,left,top,speedX,speedY,dom){
        super(width,height,left,top,speedX,speedY,dom);
    
    }
    MoveTo(){
        let landL = parseFloat(landStyle.left);
        //console.log(this.left , parseFloat(demoDomStyle.width))
        if(Math.abs(this.left) > landW/2){
            this.left = 0;
        }
    }


}

// setInterval(()=>{
//     land.Move(16/1000);
// },16)