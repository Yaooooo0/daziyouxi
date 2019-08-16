window.onload = function () {


    class Game {
        constructor(screenClassName,btn,keyBoard,life,point,alertEle,btn1) {     //constructor 属性返回对象的构造函数。
            this.screen = document.querySelector(screenClassName)
            this.btn = document.querySelector(btn)
            this.span = document.querySelector(keyBoard)
            this.life=document.querySelector(life)
            this.point=document.querySelector(point)
            this.alertEle=document.querySelector(alertEle)
            this.btn1=document.querySelector(btn1)
            this.letters = []
            this.isKill=false
            this.runToggle()
            this.createLetter()
            this.KillLetter()


        }

        //创建字母
        createLetter(num = 5) {
            for (let i = 0; i < num; i++) {
                let div = document.createElement("div")
                div.classList.add("letter")
                //随机字母
                let letter = String.fromCharCode(parseInt(Math.random() * 26 + 65))
                while (this.isRepeat(letter)) { //判断字母重复
                    letter = String.fromCharCode(parseInt(Math.random() * 26 + 65))
                }

                let left = Math.random() * 6.9
                while (this.isOverlap(left)) {
                    left = Math.random() * 6.9
                }
                //判断重叠 只要不是返回-1 就是确认重叠了
                let top = 1
                div.setAttribute("style", `background:url(img/A_Z/${letter}.png);background-size:cover;top:1rem;left:${left}rem;`)
                //随机位置
                this.screen.appendChild(div)

                //添加字母带属性letters中
                let obj = {}
                obj["title"] = letter
                obj["top"] = top
                obj["left"] = left
                obj["node"] = div
                this.letters.unshift(obj)
                this.screen.appendChild(div)
            }


        }

        //判断是否去重
        isOverlap(left) {
            let index = this.letters.findIndex((item) => {
                if (Math.abs(left - item.left) < 0.53) {
                    return item
                }
            })
            if (index != -1) {
                return true
            } else {
                return false
            }
        }

        isRepeat(letter) {
            let index = this.letters.findIndex((item) => {
                if (letter == item.title) {
                    return item
                }
            })
            if (index == -1) {
                return false
            } else {
                return true
            }
        }

        run() {
                this.t = setInterval(() => {
                    this.letters.forEach((item, index) => {
                        item.top += 0.005
                        item.node.style.top = item.top + 'rem'
                        if (item.top > 8.9) {
                            this.removeChild(index)
                            this.life.innerText-=20
                            if(this.life.innerText==0){
                                clearInterval(this.t)
                                this.alertEle.style="display:block"
                                let finaly=document.querySelector(".alert span")
                                finaly.innerHTML=this.point.innerText
                            }
                        }
                    })
                }, 5)
                    
        }
        //控制暂停开始
        runToggle() {
            let flag=true
            this.btn.ontouchstart = () => {
                if (flag) {
                    flag = false
                    this.run()
                    this.isKill=true
                    this.btn.style.background="url(img/Play.png)"
                    this.btn.style.backgroundSize="cover"
                } else {
                    flag = true
                    clearInterval(this.t)
                    this.isKill=false
                    this.btn.style.background="url(img/Pause.png)"
                    this.btn.style.backgroundSize="cover"
                }

            }
        }
       // 消除字母
        KillLetter() {
            this.span.ontouchstart = (event) => {
                if (!this.isKill) {
                    return
                }
                let target = event.target
                if (target.nodeName == "SPAN") {
                    let lettter=target.innerText
                    let index = this.letters.findIndex((item) => {
                        if (item.title==lettter) {
                            return item
                        }
                    })
                    if(index!=-1){
                         this.removeChild(index)

                   this.point0= parseInt(this.point.innerText)
                    this.point0+=5
                    this.point.innerText=this.point0
                    }

                }
            }

        }

        removeChild(index) {
            this.screen.removeChild(this.letters[index].node)
            this.letters.splice(index, 1)
            
            this.createLetter(1)
            
           
        }

        btn1Ele(){
            this.btn1.ontouchend=function () {
                game.alertEle.style="display:none;"
               game.screen.innerHTML=""
              game.letters=[]
                game.run()
               game.createLetter();
                game.life.innerText=100
                game.point.innerText=0
            }
        }



    }


    let game = new Game(".screen", ".pauseButton",".keyBoard",".life",".point",".alert",".btn")
    game.btn1Ele()

}