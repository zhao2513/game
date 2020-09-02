//天空类 ： 移动 ，超出left要手动调整

const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdW = parseFloat(birdStyle.width);
const birdH = parseFloat(birdStyle.height);
let   birdT = parseFloat(birdStyle.top);
let   birdL = parseFloat(birdStyle.left);
//大地和天空距离
let maxY = parseFloat(demoDomStyle.height) - birdH -parseFloat(landH);
console.log(maxY)


class Bird extends Demo {
    constructor(width,height,left,top,speedX,speedY,dom){
        super(width,height,left,top,speedX,speedY,dom);
        this.g = 1500;//重力加速度g ,毫秒
        this.swingNum = 0 ;
        this.timer = null;
    
    }
    //小鸟的移动不同于天空和大地
    Move(duration){
        //解决：我们不需要重新定义父类有类似功能的Move方法
        super.Move(duration);
        this.speedY += duration * this.g;
       
    }
    //小鸟的渲染
    randerDom(){
        super.randerDom();
        if (this.top < 0) {
            this.top = 0;
        }
        if(this.top > maxY){
            this.top = maxY;
            this.speedY = 0;
        }
       
    }
    //小鸟的跳动
    jump(){
        //负相当于向上移动，但每次Move移动this.speedY都会变为正数
        this.speedY = -300;
    }

    //煽动翅膀
    swingStart(){
        this.timer = setInterval(()=>{
            this.swingNum++;
            birdDom.className = `bird swing${this.swingNum%3}`;
        },300)
    }
    swingStop(){
        clearInterval(this.timer)
    }

}


// setInterval(()=>{
//     bird.Move(16/1000);
  
// },16)

