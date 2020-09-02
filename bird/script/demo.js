//面向对象：总特性
//属性:宽度、长度、横向距离、纵向距离、横向速度、纵向速度、Dom

//在全局保留DEMO 
let demoDom = document.querySelector('.demo');
let demoDomStyle = getComputedStyle(demoDom);
class Demo {
    constructor(width,height,left,top,speedX,speedY,dom){
        if(new.target === Demo){
             throw new Error('不能直接创建')
        }
        this.width = width;
        this.height = height;
        this.left = left ; 
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        this.randerDom();
    }
    //渲染DOM
    randerDom(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
      
    }
    
    Move(duration){
        //移动距离 = 时间(duration) * 速度（this.speedX)
        this.disX = duration * this.speedX;
        this.disY = duration * this.speedY;
        // console.log(duration,this.speedX,this.disX)
        this.left += this.disX;
        this.top += this.disY;
        
        
        //面向对象一种模式，在子类中添加特有的功能
        if(this.MoveTo){
            this.MoveTo();
        }

        this.randerDom();
    }
}
