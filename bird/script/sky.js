//天空类 ： 移动 ，超出left要手动调整

const skyDom = document.querySelector('.sky');
const skyStyle = getComputedStyle(skyDom);
const skyW = parseFloat(skyStyle.width);
const skyH = parseFloat(skyStyle.height);


class Sky extends Demo {
    constructor(width,height,left,top,speedX,speedY,dom){
        super(width,height,left,top,speedX,speedY,dom);
    
    }
    MoveTo(){
        if(Math.abs(this.left) > skyW/2){
            this.left = 0;
        }
    }


}
// var sky = new Sky(skyW,skyH,0,0,-100,0,skyDom);
// setInterval(()=>{
//     sky.Move(16/1000);
// },16)