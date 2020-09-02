
//创建每个管道 => 管道移动门 => 管道高度
//创建管道对

function randomH(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}



class Pipe extends Demo {
    constructor(height,top,speedX,dom){
        super(52,height,skyW/2,top,speedX,0,dom);
    }
    Move(duration){
        super.Move(duration);
        if(this.left  < -this.width){
            this.dom.remove();
        }
    }
}

class PipesProduce {
    constructor(){
        
        // 管道固定空间
        let pipeSpace = randomH(130,170);
        //下管道的高度
        let pipeBottomH = randomH(80,258);
        //上管道高度
        let  pipeTopH= skyH - landH - pipeBottomH -pipeSpace;
        //下管道的top = 天空高度 - 大地高度 - 下管道高度
        let pipeUpTop = skyH - landH - pipeBottomH ;
        //手动创建下管道
        let pipeBottom = document.createElement('div');
        pipeBottom.className = "pipe pipeDown";
        this.down = new Pipe(pipeBottomH,pipeUpTop,-100,pipeBottom);
        demoDom.appendChild(pipeBottom);

        let pipeTop = document.createElement('div');
        pipeTop.className = "pipe pipeUp";
        this.up = new Pipe(pipeTopH,0,-100,pipeTop);
        demoDom.appendChild(pipeTop);
    }
    Move(duration){
        this.up.Move(duration);
        this.down.Move(duration);
    }

    //设置访问器属性：判断该柱子是否无用
    get useLess(){
        return this.up.left < -this.up.width;
    }
    
   
}

class PipeMove {
    constructor(){

        this.timer = null;
        //注意一个细节：如果不用数组保存直接遍历Move会导致定时器的叠加
        this.PipeArr = [];
        this.createTime = 1800;
        // this.useLess;
    }
    createPipes(){
        this.timer = setInterval(()=>{
            this.PipeArr.push(new PipesProduce());
            for(let i = 0;i < this.PipeArr.length; i++){
               
                if(this.PipeArr[i].useLess){
                   
                    this.PipeArr.splice(i,1);
                    i--;
                }
                
            }
          },this.createTime)
    }
    
    startMove(duration){
        this.PipeArr.forEach(pipe=>{
            pipe.Move(duration);
            
        })
    
    }
    endMove(){
        clearInterval(this.timer)
        this.timer = null;
    }
}


