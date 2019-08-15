window.onload=function(){//

    class Game{
        constructor(screenClassName){
            this.screen=document.querySelector(screenClassName)
            this.letters=[]
        }
        //创建字母
        createLetter(mun=5){
            for (let i=0;i < num; i++){
                let div=document.createElement("div")
                div.classList.add("letter")
                //随机字母
                let letter = String.fromCharCode(parseInt(Math.random()*26+65))
                while(this.isRepeat(letter)){
                    letter=String.fromCharCode(parseInt(Math.random()*26+65))
                }
                let left=Math.random()*6.9
                while (this.isOverlap(left)){
                    left=Math.random()*6.9
                }
                //判断重叠 只要不是就返回-1
                let top=1
                div.setAttribute("style",`background:url(img/A_Z/${letter}.png);background-size:cover;top:1rem;left:{left}rem;`)
                //随机位置
                this.screen.appendChild(div)
                //添加字母带属性letters中
                let obj={}
                obj["title"]=letter
                obj["top"]=top
                obj["left"]=left
                obj["node"]=div
                this.letters.unshift(obj)

            }
        }
        isOverlap(left){
            let status = this.letters.findIndex((item)=>{
                if(Math.abs(left-item.left)<0.53){
                    if(letter==item.title){
                        return item
                    }
                }
            })
        }
    }

    let game= new Game(".screen")
    game.createLetter()

}