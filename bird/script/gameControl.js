
//该类是对整体功能的调控
//
let gameDuration = 0.016;
let score = document.querySelector(".score")
class Game {
    constructor(){
       this.isGame = false;
        this.timer = null;
        this.tick = 16;
        this.sky = new Sky(skyW,skyH,0,0,-100,0,skyDom);
        this.land = new Land(landW,landH,0,488,-100,0,landDom);
        this.bird = new Bird(birdW,birdH,birdL,birdT,0,0,birdDom);
        this.pipes = new PipeMove();
        this.score = 1;
       
        
    }
    //游戏启动
    gameStart(){
       
        if(this.timer){
            return false;
        }
        this.pipes.createPipes();
        this.bird.swingStart();
        
        this.timer = setInterval(() => {
            let duration = this.tick / 1000;
            this.pipes.startMove(duration);
            this.score ++;
            score.innerText = `当前得分为:${this.score}`
            // this.pipes.PipeArr.forEach(pipe=>{
            //             pipe.Move(duration);
                        
            //         });
            this.sky.Move(duration);
            this.land.Move(duration);
            this.bird.Move(duration);
            
            this.isGameOver();
            
            
        }, this.tick);
       
    }
    //游戏暂停
    gameStop(){
        this.bird.swingStop();
        this.pipes.endMove();
        clearInterval(this.timer)
        this.timer = null;
    }
    //游戏注册事件
    regEvent(){
        window.onclick = (e) =>{
           
                this.bird.jump();
            
        }
        window.onkeydown =(e)=>{
            if(e.key == 'Enter'){
                if(!this.timer){
                    if(this.isGame){
                        window.location.reload();
                    }
                    this.gameStart();
                }else{
                    this.gameStop();
                }
            }else if(e.key == " "){
                this.bird.jump();
                
            }
            
        }
    }

    //检测碰撞 =>小鸟与水管的中心点要 < 小鸟与水管宽度和的一半
    isHit(rec1,rec2){
        let centerX1 = rec1.left + rec1.width/2;
        let centerY1 = rec1.top + rec1.height/2;
        let centerX2 = rec2.left + rec2.width/2;
        let centerY2 = rec2.top + rec2.height/2;
        // console.log(centerX1,centerX2,centerY1)
        if((Math.abs(centerX1-centerX2) < ((rec1.width+rec2.width)/2)&& 
            Math.abs(centerY1-centerY2) < ((rec1.height+rec2.height)/2)
        )){
            return true;
        }
        return false;
    }



    //判断游戏是否结束
        //-碰到水管结束
        //-碰到地面暂停
    isGameOver(){
        for (let i = 0; i < this.pipes.PipeArr.length; i++) {
            let pipeBottomStyle =  this.pipes.PipeArr[i].down;
            let pipeTopStyle =  this.pipes.PipeArr[i].up;
            
            if(this.isHit(this.bird,pipeBottomStyle) || this.isHit(this.bird,pipeTopStyle)){
                 this.isGame = true;
                 this.gameStop();
            }
             
         }
         if(this.bird.top >= maxY){
             this.bird.top = maxY;
             this.isGame = true;
             this.gameStop();
         }
    }
}

var g = new Game();
g.regEvent();