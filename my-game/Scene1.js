let arrNumber = []
let numberPlay = 5
let zone = []
let data = []
let correctSound, incorrectSound, clappingSound, backGroundSound, question
let onlyOneObject = 0, restart = 0

class Scene1 extends Phaser.Scene{

    constructor() {
        super('Scene1');
    }

    //load image and audio;
    preload() {
        this.load.image('backGround', 'Assets/backGround.png')
        this.load.image('frameWork', 'Assets/frameWork.png')
        this.load.image('endGame', 'Assets/endGame.png')

        this.load.image('carChild', 'Assets/carChild.png')
        this.load.image('carFather', 'Assets/carFather.png')

        this.load.image('StartSheet', 'Assets/StartSheet.png')
        this.load.image('startButton1', 'Assets/startButton1.png')
        this.load.image('startButton2', 'Assets/startButton2.png')
        this.load.image('restartButton', 'Assets/restartButton.png')

        this.load.image('bridge', 'Assets/bridge.png')
        this.load.image('bridge1', 'Assets/bridge1.png')
        this.load.image('cloudMove', 'Assets/cloudMove.png')

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

        this.load.audio('backGroundSound','assets/Audio/backGroundSound.mp3')
        this.load.audio('incorrect','assets/Audio/incorrect.mp3')
        this.load.audio('correct','assets/Audio/correct.mp3')
        this.load.audio('clapping','assets/Audio/clapping.mp3')
        this.load.audio('question','assets/Audio/question.mp3')
    }

    //create game;
    create(){
        this.backGround = this.add.image(0, 0, 'backGround').setOrigin(0, 0)
        this.frameWork = this.add.image(325, 20, 'frameWork').setOrigin(0, 0)

        correctSound = this.sound.add('correct')
        incorrectSound = this.sound.add('incorrect')
        clappingSound = this.sound.add('clapping')
        backGroundSound = this.sound.add('backGroundSound')
        question = this.sound.add('question')

        this.scene1()
    }

    scene1(){
        this.carChild = this.add.image(370, 450, 'carChild').setOrigin(0, 0)
        this.carFather = this.add.image(1020, 350, 'carFather').setOrigin(0, 0)
        if(restart === 0){
            this.startButton()
        }
        else{
            this.scene2()
        }
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

    scene2(){
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let musicConfigQuestion = {
            mute: false,
            volume: 3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 1
        }
        question.play(musicConfigQuestion)
        backGroundSound.play(musicConfig)
        this.randomDataNumber()
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

        let pos = 0

        for(let i = 0; i < 9; i++){

            if(i === arrNumber.indexOf(data1)){
                data[i] = this.setLocalDataNumberConst(data1, i)
            }
            else if(i === arrNumber.indexOf(data2)){
                data[i] = this.setLocalDataNumberConst(data2, i)
            }
            else if(i === arrNumber.indexOf(data3)){
                data[i] = this.setLocalDataNumberConst(data3, i)
            }
            else if(i === arrNumber.indexOf(data4)){
                data[i] = this.setLocalDataNumberConst(data4, i)
            }
            else{
                zone[i] = this.setLocalZones(i, "bridge1").setInteractive()

                data[i] = this.setLocalDataNumberDynamic(arrNumber[i], pos++, i)
            }
        }

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('gameobjectdown', function (pointer, gameObject) {

            if(gameObject.name === 0){
                zone[0].input.dropZone = true;
            }
            else if(gameObject.name === 1){
                zone[1].input.dropZone = true;
            }
            else if(gameObject.name === 2){
                zone[2].input.dropZone = true;
            }
            else if(gameObject.name === 3){
                zone[3].input.dropZone = true;
            }
            else if(gameObject.name === 4){
                zone[4].input.dropZone = true;
            }
            else if(gameObject.name === 5){
                zone[5].input.dropZone = true;
            }
            else if(gameObject.name === 6){
                zone[6].input.dropZone = true;
            }
            else if(gameObject.name === 7){
                zone[7].input.dropZone = true;
            }
            else {
                zone[8].input.dropZone = true;
            }

        });

        this.input.on('gameobjectup', function (pointer, gameObject) {

            if(gameObject.name === 0){
                zone[0].input.dropZone = false;
            }
            else if(gameObject.name === 1){
                zone[1].input.dropZone = false;
            }
            else if(gameObject.name === 2){
                zone[2].input.dropZone = false;
            }
            else if(gameObject.name === 3){
                zone[3].input.dropZone = false;
            }
            else if(gameObject.name === 4){
                zone[4].input.dropZone = false;
            }
            else if(gameObject.name === 5){
                zone[5].input.dropZone = false;
            }
            else if(gameObject.name === 6){
                zone[6].input.dropZone = false
            }
            else if(gameObject.name === 7){
                zone[7].input.dropZone = false
            }
            else {
                zone[8].input.dropZone = false
            }

        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {


        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {


        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x + 5
            gameObject.y = dropZone.y + 30

            numberPlay--

            if(numberPlay === 0){

                let musicConfig = {
                    mute: false,
                    volume: 3,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0
                }
                correctSound.play(musicConfig)

                let musicConfigClap = {
                    mute: false,
                    volume: 5,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 5
                }
                clappingSound.play(musicConfigClap)

            }
            else{
                let musicConfig = {
                    mute: false,
                    volume: 3,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0
                }
                correctSound.play(musicConfig)
            }

            gameObject.input.enabled = false;

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;

                let musicConfig = {
                    mute: false,
                    volume: 3,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0
                }

                incorrectSound.play(musicConfig)
            }

        });

    }

    setLocalZones(local, image){

        if(local == 0){
            this.bridge1 = this.add.image(480, 430, image).setOrigin(0, 0)
        }
        else if(local == 1){
            this.bridge1 = this.add.image(540, 430, image).setOrigin(0, 0)
        }
        else if(local == 2){
            this.bridge1 = this.add.image(600, 430, image).setOrigin(0, 0)
        }
        else if(local == 3){
            this.bridge1 = this.add.image(660, 430, image).setOrigin(0, 0)
        }
        else if(local == 4){
            this.bridge1 = this.add.image(720, 430, image).setOrigin(0, 0)
        }
        else if(local == 5){
            this.bridge1 = this.add.image(780, 430, image).setOrigin(0, 0)
        }
        else if(local == 6){
            this.bridge1 = this.add.image(840, 430, image).setOrigin(0, 0)
        }
        else if(local == 7){
            this.bridge1 = this.add.image(900, 430, image).setOrigin(0, 0)
        }
        else{
            this.bridge1 = this.add.image(960, 430, image).setOrigin(0, 0)
        }

        return this.bridge1

    }

    setLocalDataNumberConst(dataNumber, local){

        switch (local) {
            case 0:
                this.bridge = this.add.image(480, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(485, 460, dataNumber).setOrigin(0, 0)
                break
            case 1:
                this.bridge = this.add.image(540, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(545, 460, dataNumber).setOrigin(0, 0)
                break
            case 2:
                this.bridge = this.add.image(600, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(605, 460, dataNumber).setOrigin(0, 0)
                break
            case 3:
                this.bridge = this.add.image(660, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(665, 460, dataNumber).setOrigin(0, 0)
                break
            case 4:
                this.bridge = this.add.image(720, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(725, 460, dataNumber).setOrigin(0, 0)
                break
            case 5:
                this.bridge = this.add.image(780, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(785, 460, dataNumber).setOrigin(0, 0)
                break
            case 6:
                this.bridge = this.add.image(840, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(845, 460, dataNumber).setOrigin(0, 0)
                break
            case 7:
                this.bridge = this.add.image(900, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(905, 460, dataNumber).setOrigin(0, 0)
                break
            case 8:
                this.bridge = this.add.image(960, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(965, 460, dataNumber).setOrigin(0, 0)
                break
        }

        return this.data
    }

    setLocalDataNumberDynamic(dataNumber, local, checkOrder){

        switch (local) {
            case 0:
                this.data = this.add.image(655, 555, dataNumber).setName(checkOrder)
                break
            case 1:
                this.data = this.add.image(855, 555, dataNumber).setName(checkOrder)
                break
            case 2:
                this.data = this.add.image(555, 555, dataNumber).setName(checkOrder)
                break
            case 3:
                this.data = this.add.image(955, 555, dataNumber).setName(checkOrder)
                break
            case 4:
                this.data = this.add.image(755, 555, dataNumber).setName(checkOrder)
                break
        }

        this.data.setOrigin(0, 0).setInteractive()
        this.input.setDraggable(this.data);

        return this.data
    }

    //Update;
    update(){

        if(numberPlay === 0) {
            numberPlay = -1
            this.time.delayedCall(2000, function Correct() {

                this.destroyObject()

            }, [], this);
        }

        if(numberPlay === - 1){
            numberPlay = -2
            this.time.delayedCall(4000, function Correct() {

                this.createBridge()
                this.children.bringToTop(this.carChild);

            }, [], this);
        }

        if(numberPlay === -2){
            this.time.delayedCall(6000, function Correct() {

                this.animationCar()

            }, [], this);
        }

        if(numberPlay === -3 && onlyOneObject === 0){
            this.scene3()
        }

    }

    animationCar(){
        this.children.bringToTop(this.carChild)
        if(this.carChild.x < 1000) {
            this.carChild.x += 3
        }
        else{
            numberPlay = -3
        }
    }

    destroyObject(){
        for(let i = 0; i < 9; i++){
            data[i].destroy()
        }
    }

    createBridge(){
        for(let i = 0; i < 9; i++){
            if(zone[i] !== null){
                zone[i] = this.setLocalZones(i, "bridge").setInteractive()
            }
        }
    }

    scene3(){
        onlyOneObject++
        restart++
        this.endGame = this.add.image(525, 150, 'endGame').setOrigin(0, 0)
        this.restartButotn = this.add.image(704, 340, 'restartButton').setOrigin(0, 0)
        backGroundSound.stop()
        this.restartButotn.setInteractive().on('pointerdown', () => {
            numberPlay = 5
            onlyOneObject = 0
            this.scene.start('Scene1');
        })
    }

}

