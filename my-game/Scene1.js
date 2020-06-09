let arrNumber = [];

class Scene1 extends Phaser.Scene{

    constructor() {
        super('Scene1');
    }

    //load image and audio;
    preload() {
        this.load.image('backGround', 'Assets/backGround.png')
        this.load.image('frameWork', 'Assets/frameWork.png')

        this.load.image('carChild', 'Assets/carChild.png')
        this.load.image('carFather', 'Assets/carFather.png')

        this.load.image('StartSheet', 'Assets/StartSheet.png')
        this.load.image('startButton1', 'Assets/startButton1.png')
        this.load.image('startButton2', 'Assets/startButton2.png')

        this.load.image('bridge', 'Assets/bridge.png')
        this.load.image('bridge1', 'Assets/bridge1.png')
        this.load.image('bridge2', 'Assets/bridge2.png')

        this.load.image('0', 'Assets/0.png')
        this.load.image('1', 'Assets/1.png')
        this.load.image('2', 'Assets/2.png')
        this.load.image('3', 'Assets/3.png')
        this.load.image('4', 'Assets/4.png')
        this.load.image('5', 'Assets/5.png')
        this.load.image('6', 'Assets/6.png')
        this.load.image('7', 'Assets/7.png')
        this.load.image('8', 'Assets/8.png')
        this.load.image('9', 'Assets/9.png')
        this.load.image('10', 'Assets/10.png')
        this.load.image('11', 'Assets/11.png')
        this.load.image('12', 'Assets/12.png')
        this.load.image('13', 'Assets/13.png')
        this.load.image('14', 'Assets/14.png')
        this.load.image('15', 'Assets/15.png')
        this.load.image('16', 'Assets/16.png')
        this.load.image('17', 'Assets/17.png')
        this.load.image('18', 'Assets/18.png')
        this.load.image('19', 'Assets/19.png')
        this.load.image('20', 'Assets/20.png')
        this.load.image('21', 'Assets/21.png')
        this.load.image('22', 'Assets/22.png')
        this.load.image('23', 'Assets/23.png')
        this.load.image('24', 'Assets/24.png')
        this.load.image('25', 'Assets/25.png')
        this.load.image('26', 'Assets/26.png')
        this.load.image('27', 'Assets/27.png')
        this.load.image('28', 'Assets/28.png')
        this.load.image('29', 'Assets/29.png')
        this.load.image('30', 'Assets/30.png')
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
        this.carChild = this.add.image(370, 450, 'carChild').setOrigin(0, 0)
        this.carFather = this.add.image(1020, 350, 'carFather').setOrigin(0, 0)
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

        this.setLocalDataNumberConst(data1, arrNumber.indexOf(data1))
        this.setLocalDataNumberConst(data2, arrNumber.indexOf(data2))
        this.setLocalDataNumberConst(data3, arrNumber.indexOf(data3))
        this.setLocalDataNumberConst(data4, arrNumber.indexOf(data4))

        let pos = 0
        for(let i = 0; i < 9; i++){
            if(i === arrNumber.indexOf(data1) || i === arrNumber.indexOf(data2) ||
                i === arrNumber.indexOf(data3) || i === arrNumber.indexOf(data4)){
            }
            else{
                this.setLocalZones(i)
                this.setLocalDataNumberDynamic(arrNumber[i], pos++, i)
            }
        }

        //return arrNumber
    }

    setLocalZones(local){

        if(local == 0){
            this.bridge1 = this.add.image(480, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 1){
            this.bridge1 = this.add.image(540, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 2){
            this.bridge1 = this.add.image(600, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 3){
            this.bridge1 = this.add.image(660, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 4){
            this.bridge1 = this.add.image(720, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 5){
            this.bridge1 = this.add.image(780, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 6){
            this.bridge1 = this.add.image(840, 430, 'bridge1').setOrigin(0, 0)
        }
        else if(local == 7){
            this.bridge1 = this.add.image(900, 430, 'bridge1').setOrigin(0, 0)
        }
        else{
            this.bridge1 = this.add.image(960, 430, 'bridge1').setOrigin(0, 0)
        }

        this.bridge1.setInteractive()

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTint(0xFFC400)
        })

        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.clearTint()
        })

    }

    setLocalDataNumberConst(dataNumber, local){

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

    setLocalDataNumberDynamic(dataNumber, local, checkOrder){
        if(local == 2){
            this.dataGroup1(dataNumber, 550, 525, checkOrder)
        }
        else if(local == 0){
            this.dataGroup1(dataNumber, 650, 525, checkOrder)
        }
        else if(local == 4){
            this.dataGroup1(dataNumber, 750, 525, checkOrder)
        }
        else if(local == 1){
            this.dataGroup1(dataNumber, 850, 525, checkOrder)
        }
        else{
            this.dataGroup1(dataNumber, 950, 525, checkOrder)
        }
    }

    dataGroup(dataNumber, x, y){
        // 960 430
        this.bridge = this.add.image(x, y, 'bridge').setOrigin(0, 0)
        this.dataNumber = this.add.image(x + 5, y + 30, dataNumber).setOrigin(0, 0)

    }

    dataGroup1(dataNumber, x, y, checkOrder){

        var dataNumber = this.add.image(x + 5, y + 30, dataNumber).setOrigin(0, 0).setInteractive()

        this.input.setDraggable(dataNumber);

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {


        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {


        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }

        });
    }

    scene2(){
        this.randomDataNumber()
    }

    animationCar(){
        this.children.bringToTop(this.carChild)
        if(this.carChild.x < 1000) {
            this.carChild.x += 1.5
        }
    }

    //Update;
    update(){

        this.animationCar()
    }

}

