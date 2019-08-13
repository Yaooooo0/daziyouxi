window.onload = function () {


    class Game {
        constructor(screenClassName) {     //constructor 属性返回对象的构造函数。
            this.screen = document.querySelector(screenClassName)
            this.letters=[]
        }

        //创建字母
        createLetter(num = 5) {
            for (let i = 0; i < num; i++) {
                let div = document.createElement("div")
                div.classList.add("letter")
                //随机字母
                let letter = String.fromCharCode(parseInt(Math.random() * 26 + 65))
                //判断字母重复
                while (this.isRepeat(letter)){
                    letter=String.fromCharCode(parseInt(Math.random()*26+65))
                }
                let left = Math.random() * 6.9
                while (this.isOverlap(left)) {
                    left = Math.random() * 6.9
                }
                //判断重叠 只要不是返回-1 就是确认重叠了
                let top=1
                div.setAttribute("style", `background:url(img/A_Z/${letter}.png);background-size:cover;top:1rem;left:${left}rem;`)
                //随机位置
                this.screen.appendChild(div)

                //添加字母带属性letters中
                let obj={}
                obj["title"] =letter
                obj["top"] = top
                obj["left"]=left
                obj["node"]=div
                this.letters.unshift(obj)
            }


        }
        //判断是否去重
        isOverlap(left){
                let status = this.letters.findIndex((item)=>{
                    if(Math.abs(left-item.left)<0.53){
                        return item
                    }
                })
            if(status!=-1){
                return true
            }else{
                return  false
            }
    }
        isRepeat(letter){
            let status=this.letters.findIndex((item)=>{
                if (letter==item.title){
                    return item
                }
            })
            if(status==-1){
                return false
            }else {
                return  true
            }
        }
        run(){
            this.t=setInterval(()=>{
                this.letters.forEach((item,index)=>{
                    item.top+=0.2
                    item.node.style.top=item.top+'rem'
                    if (item.top>8.9){
                        this.screen.removeChild(item.node)
                        this.letters.splice(index,1)
                        this.createLetter(1)
                    }
                })
            },500)
        }


    }



    let game = new Game(".screen")
    game.createLetter()
    game.run()


}