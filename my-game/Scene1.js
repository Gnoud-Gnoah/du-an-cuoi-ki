let arrNumber = [];

class Scene1 extends Phaser.Scene{

    constructor() {
        super('Scene1');
    }

    //load image and audio;
    preload() {
        this.load.image('backGround', 'Assets/backGround.png')
        this.load.image('frameWork', 'Assets/frameWork.png')

        this.load.image('1', 'Assets/1.png')
        this.load.image('2', 'Assets/2.png')

        this.load.image('StartSheet', 'Assets/StartSheet.png')
        this.load.image('startButton1', 'Assets/startButton1.png')
        this.load.image('startButton2', 'Assets/startButton2.png')

        this.load.image('bridge', 'Assets/bridge.png')
        this.load.image('bridge1', 'Assets/bridge1.png')
        this.load.image('bridge2', 'Assets/bridge2.png')
    }

    //create game;
    create(){
        this.backGround = this.add.image(0, 0, 'backGround').setOrigin(0, 0)
        this.frameWork = this.add.image(325, 20, 'frameWork').setOrigin(0, 0)

        this.scene1()
    }

    startButton(){
        this.StartSheet = this.add.image(329, 20, 'StartSheet').setOrigin(0, 0)

        this.startButton1 = this.add.image(660, 200, 'startButton1').setOrigin(0, 0)
        this.startButton1.setInteractive().on('pointerover', () => {
            this.startButton1.destroy()

            this.startButton2 = this.add.image(625, 175, 'startButton2').setOrigin(0, 0)
            this.startButton2.setInteractive().on('pointerup', () => {
                this.StartSheet.destroy()
                this.startButton2.destroy()
                this.scene2()
            })
            this.startButton2.on('pointerout', () =>{
                this.StartSheet.destroy()
                this.startButton2.destroy()
                this.startButton1.destroy()
                this.startButton();
            })
        })

    }

    scene1(){
        this.carChild = this.add.image(370, 450, '1').setOrigin(0, 0)
        this.carFather = this.add.image(1020, 350, '2').setOrigin(0, 0)
        this.startButton()
    }

    randomDataNumber(){

        while(arrNumber.length != 9){
            let temp = Phaser.Math.Between(0, 30);
            if(arrNumber.length == 0){
                arrNumber.push(temp)
            }
            else{
                if(arrNumber.indexOf(temp) == -1){
                    arrNumber.push(temp)
                }
            }
        }

        for(let i = 0; i < 8; i++){
            for(let j = i + 1; j < 9; j++){
                if(arrNumber[j] < arrNumber [i]){
                    let temp = arrNumber[i]
                    arrNumber[i] = arrNumber[j]
                    arrNumber[j] = temp
                }
            }
        }

        let data1 = arrNumber[Math.floor(Math.random() * arrNumber.length)]

        let data2
        while(1) {
            data2 = arrNumber[Math.floor(Math.random() * arrNumber.length)]
            if(data2 !== data1) break
        }

        let data3
        while(1) {
            data3 = arrNumber[Math.floor(Math.random() * arrNumber.length)]
            if(data3 !== data1 && data3 !== data2) break
        }

        let data4
        while(1) {
            data4 = arrNumber[Math.floor(Math.random() * arrNumber.length)]
            if(data4 !== data1 && data4 !== data2 && data4 !== data3) break
        }

        this.setLocalDataNumber(data1, arrNumber.indexOf(data1))
        this.setLocalDataNumber(data2, arrNumber.indexOf(data2))
        this.setLocalDataNumber(data3, arrNumber.indexOf(data3))
        this.setLocalDataNumber(data4, arrNumber.indexOf(data4))

        for(let i = 0; i < 9; i++){
            console.log(arrNumber[i])
        }

        //return arrNumber
    }

    setLocalDataNumber(dataNumber, local){
        if(local == 0){
            this.dataGroup(dataNumber, 480, 430)
        }
        else if(local == 1){
            this.dataGroup(dataNumber, 540, 430)
        }
        else if(local == 2){
            this.dataGroup(dataNumber, 600, 430)
        }
        else if(local == 3){
            this.dataGroup(dataNumber, 660, 430)
        }
        else if(local == 4){
            this.dataGroup(dataNumber, 720, 430)
        }
        else if(local == 5){
            this.dataGroup(dataNumber, 780, 430)
        }
        else if(local == 6){
            this.dataGroup(dataNumber, 840, 430)
        }
        else if(local == 7){
            this.dataGroup(dataNumber, 900, 430)
        }
        else{
            this.dataGroup(dataNumber, 960, 430)
        }
    }

    dataGroup(dataNumber, x, y){
        // 960 430
        this.bridge = this.add.image(x, y, 'bridge').setOrigin(0, 0)
        this.dataNumber = this.add.text(x + 5, y + 30, dataNumber, {font: '35px Arial', fill: 'red'}).setOrigin(0, 0)
    }

    scene2(){
        this.randomDataNumber()
    }

    //Update;
    update(){

    }

}

